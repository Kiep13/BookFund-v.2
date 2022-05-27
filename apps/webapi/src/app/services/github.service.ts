import axios from 'axios';
import * as queryString from 'query-string';

import { connection } from '@core/connection';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IGutHubUser } from '@core/interfaces';
import { environment } from '@environments/environment';
import { AccountEntity } from '@entities/account.entity';
import { folderService } from '@services/folder.service';
import { SocialAuthService } from '@services/social-auth.service';
import { tokenService } from '@services/token.service';

class GithubService extends SocialAuthService {
  protected authProvider: AuthProviders = AuthProviders.GITHUB;

  public async login(code: string): Promise<IAuthResponse> {
    const gitHubTokens = queryString.parse(await this.getTokens(code));

    const user = await this.getUser(gitHubTokens.access_token.toString());
    [user.firstName, user.lastName] = user.name.split(' ');
    user.email = `github-generated-email${user.id}@bk.ru`;

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email,
      provider: this.authProvider
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    const tokens = tokenService.generateTokens({
      id: account.id,
      email: account.email,
      name: account.name,
      surname: account.surname,
      image: account.image,
      role: account.role,
      provider: account.provider
    });

    return {
      account,
      ...tokens
    }
  }

  protected async register(user: IGutHubUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.firstName;
    accountEntity.surname = user.lastName;
    accountEntity.image = user.avatar_url;
    accountEntity.provider = this.authProvider;

    await connection.manager.save(accountEntity);
    await folderService.createDefaultFolder(accountEntity);

    return accountEntity;
  }

  protected async synchronize(accountId: number, user: IGutHubUser): Promise<AccountEntity> {
    const accountEntity = await connection.manager.findOne(AccountEntity, accountId);

    accountEntity.email = user.email;
    accountEntity.name = user.firstName;
    accountEntity.surname = user.lastName;
    accountEntity.image = user.avatar_url;

    return connection.manager.save(accountEntity);
  }

  protected getTokens(code: string): Promise<string> {
    const options = {
      code,
      client_id: environment.githubClientId,
      client_secret: environment.githubClientSecret,
      redirect_uri: `${environment.clientUrl}/auth/${this.authProvider}`,
      state: environment.githubState
    };

    return axios.post(`https://github.com/login/oauth/access_token`, queryString.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.data);
  }

  protected getUser(accessToken: string): Promise<IGutHubUser> {
    return axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.data);
  }
}

export const githubService = new GithubService();
