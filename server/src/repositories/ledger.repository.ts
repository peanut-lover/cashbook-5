import { Op } from 'sequelize';
import Ledger from '../models/ledger.model';

class LedgerRepository {
  /**
   * Get Ledgers (between startDate and endDate)
   * @param startDate Date
   * @param endDate Date
   * @param userId number
   * @returns  Promise<Ledger[]>
   */
  async userLedgersByMonth(startDate: Date, endDate: Date, userId: number): Promise<Ledger[]> {
    const Ledgers = await Ledger.findAll({
      include: [Ledger.associations.category, Ledger.associations.user, Ledger.associations.paymentType],
      order: [['date', 'ASC']],
      where: {
        userId: userId,
        date: { [Op.between]: [startDate, endDate] },
      },
    });

    return Ledgers;
  }

  /**
   * Ledger를 생성하는 API
   * @param userId 유저의 고유 식별자(id)
   * @param categoryId 카테고리의 고유 식별자(id)
   * @param content Ledger의 내용
   * @param amount Ledger의 비용
   * @param date Ledger의 생성 일자
   * @returns 생성된 Ledger 데이터의 id
   */
  async createLedger(
    userId: number,
    categoryId: number,
    paymentTypeId: number,
    content: string,
    amount: number,
    date: string
  ): Promise<number | null> {
    const newLedger = await Ledger.create<Ledger>({
      userId,
      paymentTypeId,
      categoryId,
      date,
      content,
      amount,
    });
    if (newLedger) {
      return newLedger.id!;
    } else {
      return null;
    }
  }

  /**
   * 하나의 Ledger를 조회하는 API
   * @param id Ledger Id
   */
  async getLedger(id: number): Promise<Ledger | null> {
    return await Ledger.findOne({
      include: [Ledger.associations.category, Ledger.associations.paymentType, Ledger.associations.user],
      where: { id },
    });
  }

  /**
   * id를 이용해서 Ledger 삭제
   */
  async deleteLedger(id: number): Promise<number> {
    const countOfDeleted = await Ledger.destroy({ where: { id } });
    return countOfDeleted;
  }
}

const ledgerRepository = new LedgerRepository();
export default ledgerRepository;
