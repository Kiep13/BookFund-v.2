import axios from 'axios';
import * as queryString from 'query-string';

import { connection } from '@core/connection';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IGutHubUser } from '@core/interfaces';
import { environment } from '@environments/environment';
import { AccountEntity } from '@entities/account.entity';
import { tokenService } from '@services/token.service';

class GithubService {
  public async login(code: string): Promise<IAuthResponse> {
    const gitHubTokens = queryString.parse(await this.getGithubTokens(code));

    const user = await this.getUser(gitHubTokens.access_token.toString());
    [user.firstName, user.lastName] = user.name.split(' ');
    user.email = `github-generated-email${user.id}@bk.ru`;

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email,
      provider: AuthProviders.GITHUB
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    const tokens = tokenService.generateTokens({
      email: account.email,
      name: account.name,
      surname: account.surname,
      image: account.image,
      role: account.role
    });

    return {
      account,
      ...tokens
    }
  }

  private getGithubTokens(code: string): Promise<string> {
    const options = {
      code,
      client_id: environment.githubClientId,
      client_secret: environment.githubClientSecret,
      redirect_uri: `${environment.clientUrl}/auth/${AuthProviders.GITHUB}`,
      state: environment.githubState
    };

    return axios.post(`https://github.com/login/oauth/access_token`, queryString.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.data);
  }

  private getUser(accessToken: string): Promise<IGutHubUser> {
    return axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.data);
  }

  private register(user: IGutHubUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.firstName;
    accountEntity.surname = user.lastName;
    accountEntity.image = user.avatar_url;
    accountEntity.provider = AuthProviders.GITHUB;

    return connection.manager.save(accountEntity);
  }

  private async synchronize(accountId: number, user: IGutHubUser): Promise<AccountEntity> {
    const accountEntity = await connection.manager.findOne(AccountEntity, accountId);

    accountEntity.email = user.email;
    accountEntity.name = user.firstName;
    accountEntity.surname = user.lastName;
    accountEntity.image = user.avatar_url;

    return connection.manager.save(accountEntity);
  }
}

export const githubService = new GithubService();
