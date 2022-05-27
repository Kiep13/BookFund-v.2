import { AccountEntity } from '@entities/account.entity';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IFacebookUser, IGoogleUser, IGutHubUser } from '@core/interfaces';

export abstract class SocialAuthService {
  protected abstract authProvider: AuthProviders;

  public abstract login(code: string): Promise<IAuthResponse>;
  protected abstract register(parameter?: any): Promise<AccountEntity>;
  protected abstract synchronize(accountId: number, user: IFacebookUser | IGoogleUser | IGutHubUser): Promise<AccountEntity>;
  protected abstract getTokens(code: string): Promise<any>;
  protected abstract getUser(accessToken: string, idToken?: string): Promise<IFacebookUser | IGoogleUser | IGutHubUser>;
}
