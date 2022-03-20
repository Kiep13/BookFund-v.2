import axios from 'axios';

import { connection } from '@core/connection';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IFacebookAuthTokens, IFacebookUser } from '@core/interfaces';
import { environment } from '@environments/environment';
import { AccountEntity } from '@entities/account.entity';
import { tokenService } from '@services/token.service';

class FacebookService {
  public async login(code: string): Promise<IAuthResponse> {
    const facebookTokens: IFacebookAuthTokens = await this.getFacebookTokens(code);

    const user: IFacebookUser = await this.getUser(facebookTokens.access_token);

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email,
      provider: AuthProviders.FACEBOOK
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    const tokens = tokenService.generateTokens({
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

  private getFacebookTokens(code: string): Promise<IFacebookAuthTokens> {
    const options = {
      client_id: environment.facebookClientId,
      client_secret: environment.facebookClientSecret,
      redirect_uri: `${environment.clientUrl}/auth/${AuthProviders.FACEBOOK}`,
      code
    }

    return axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
      params: options
    }).then((response) => response.data);
  }

  private getUser(accessToken: string): Promise<IFacebookUser> {
    return axios.get('https://graph.facebook.com/me', {
      params: {
        access_token: accessToken,
        fields: ['id', 'email', 'first_name', 'last_name', 'picture.height(300)'].join(',')
      }
    }).then((response) => response.data);
  }

  private register(user: IFacebookUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.first_name;
    accountEntity.surname = user.last_name;
    accountEntity.image = user.picture?.data.url;
    accountEntity.provider = AuthProviders.FACEBOOK;

    return connection.manager.save(accountEntity);
  }

  private async synchronize(accountId: number, user: IFacebookUser): Promise<AccountEntity> {
    const accountEntity = await connection.manager.findOne(AccountEntity, accountId);

    accountEntity.email = user.email;
    accountEntity.name = user.first_name;
    accountEntity.surname = user.last_name;
    accountEntity.image = user.picture?.data.url;

    return connection.manager.save(accountEntity);
  }
}

export const facebookService = new FacebookService();
