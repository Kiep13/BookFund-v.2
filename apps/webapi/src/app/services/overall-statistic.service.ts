import { connection } from '@core/connection';
import { IDateRange, IOverallItem, IOverallStatistic } from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { ArticleEntity } from '@entities/article.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';

class OverallStatisticService {
  public async getOverallStatistic(dateRange: IDateRange): Promise<IOverallStatistic> {
    const usersStatistic = await OverallStatisticService.getEntityChangesData(AccountEntity, dateRange);
    const favoritesStatistic = await OverallStatisticService.getEntityChangesData(FavoriteEntity, dateRange);
    const commentsStatistic = await OverallStatisticService.getEntityChangesData(CommentEntity, dateRange);
    const articlesStatistic = await OverallStatisticService.getEntityChangesData(ArticleEntity, dateRange);

    const usersTotal: number = await OverallStatisticService.getTotalByPeriod(AccountEntity, dateRange.endDate);
    const favoritesTotal: number = await OverallStatisticService.getTotalByPeriod(FavoriteEntity, dateRange.endDate);
    const commentsTotal: number = await OverallStatisticService.getTotalByPeriod(CommentEntity, dateRange.endDate);
    const articlesTotal: number = await OverallStatisticService.getTotalByPeriod(ArticleEntity, dateRange.endDate);

    return {
      users: OverallStatisticService.buildPositionResult(usersStatistic, usersTotal),
      favorites: OverallStatisticService.buildPositionResult(favoritesStatistic, favoritesTotal),
      comments: OverallStatisticService.buildPositionResult(commentsStatistic, commentsTotal),
      articles: OverallStatisticService.buildPositionResult(articlesStatistic, articlesTotal)
    };
  }

  private static async getEntityChangesData(entity: any, dateRange: IDateRange): Promise<number> {
    return await connection.createQueryBuilder(entity, 'entity')
      .select('COUNT(entity.id)', 'amount')
      .where(`entity.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
      .getCount();
  }

  private static async getTotalByPeriod(entity: any, endDate): Promise<number> {
    return await connection.createQueryBuilder(entity, 'entity')
      .select('COUNT(entity.id)', 'amount')
      .where(`entity.createdAt <= '${endDate}'`)
      .getCount();
  }

  private static buildPositionResult(current: number, total: number): IOverallItem {
    return {
      current: current || 0,
      total: total
    }
  }
}

export const overallStatisticService = new OverallStatisticService();
