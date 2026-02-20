import { Request, Response, NextFunction } from "express";
import { cacheResponse } from "../redis/redis-utils";
import "dotenv/config";
import { NotFoundError } from "../errors/not-found-error";
import { transformReports } from "../helpers/transformReports";

const { ALT_API_KEY, ALT_BASE_URL } = process.env;

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ticker = req.params.ticker;
  const period = req.query.period;

  try {
    const balanceResponse = await fetch(
      ALT_BASE_URL +
        `stable/balance-sheet-statement?symbol=${ticker}&period=${period}&apikey=${ALT_API_KEY}`,
    );

    const incomeResponse = await fetch(
      ALT_BASE_URL +
        `stable/income-statement?symbol=${ticker}&period=${period}&apikey=${ALT_API_KEY}`
    )

    const cashFlowResponse = await fetch(
      ALT_BASE_URL +
        `stable/cash-flow-statement?symbol=${ticker}&period=${period}&apikey=${ALT_API_KEY}`
    )

    const balanceData = await balanceResponse.json()
    const incomeData = await incomeResponse.json()
    const cashFlowData = await cashFlowResponse.json()

    if(!balanceData[0]){
      return next(new NotFoundError("Balance Sheet Statement not Found"))
    }

    if(!incomeData[0]){
      return next(new NotFoundError("Income Statement not Found"))
    }

    if(!cashFlowData){
      return next(new NotFoundError("Cash Flow Statement not Found"))
    }

    const fullReport = transformReports(balanceData, incomeData, cashFlowData)

    await cacheResponse(res, fullReport)

    res.send(fullReport)

  } catch (error) {
    next(error)
  }
};
