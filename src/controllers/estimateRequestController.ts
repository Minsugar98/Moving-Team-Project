import { NextFunction, Request, Response } from 'express';
import { CreateEstimateReq } from '../structs/estimateRequest-struct';
import estimateRequestService, {
  PagenationQuery,
} from '../services/estimateRequestService';
import { CustomError } from '../middlewares/errHandler';

// 견적 요청 작성 API
async function createEstimateReq(
  req: Request<{}, {}, CreateEstimateReq>,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      typeof req.user.id !== 'number'
    ) {
      const err: CustomError = new Error('권한이 없습니다.');
      err.status = 401;
      throw err;
    }

    const { id: userId } = req.user;
    const estimateReq = await estimateRequestService.createEstimateReq(
      userId,
      req.body
    );
    res.status(201).send(estimateReq);
  } catch (err) {
    return next(err);
  }
}

// 견적 요청 삭제 API
async function deleteEstimateReq(
  req: Request<{ estimateRequestId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      typeof req.user.id !== 'number'
    ) {
      const err: CustomError = new Error('권한이 없습니다.');
      err.status = 401;
      throw err;
    }

    const { id: userId } = req.user;
    const { estimateRequestId } = req.params;
    const id = Number(estimateRequestId);
    const estimateReq = await estimateRequestService.deleteEstimateReq(
      userId,
      id
    );

    res.send(estimateReq);
  } catch (err) {
    return next(err);
  }
}

// 유저-견적 요청 조회 API
async function findEstimateReq(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      typeof req.user.id !== 'number'
    ) {
      const err: CustomError = new Error('권한이 없습니다.');
      err.status = 401;
      throw err;
    }

    const { id: userId } = req.user;
    const estimateReq = await estimateRequestService.findEstimateReq(userId);
    res.send(estimateReq);
  } catch (err) {
    return next(err);
  }
}

// 유저-견적 요청 리스트 조회 API
async function findEstimateReqListByCustomer(
  req: Request<{}, {}, {}, { page?: string; pageSize?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      typeof req.user.id !== 'number'
    ) {
      const err: CustomError = new Error('권한이 없습니다.');
      err.status = 401;
      throw err;
    }

    const { id: userId } = req.user;
    const { page = '1', pageSize = '4' } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 4;
    const skip = (pageNum - 1) * pageSizeNum;

    const estimateReqList =
      await estimateRequestService.findEstimateReqListByCustomer(
        userId,
        skip,
        pageSizeNum
      );

    res.send(estimateReqList);
    return;
  } catch (err) {
    return next(err);
  }
}

// 기사-견적 요청 리스트 조회 API
async function findEstimateReqListByMover(
  req: Request<{}, {}, {}, PagenationQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      typeof req.user.id !== 'number'
    ) {
      const err: CustomError = new Error('권한이 없습니다.');
      err.status = 401;
      throw err;
    }

    const { id: userId } = req.user;
    const estimateReqList =
      await estimateRequestService.findEstimateReqListByMover(
        userId,
        req.query
      );
    res.send(estimateReqList);
  } catch (err) {
    return next(err);
  }
}

export default {
  createEstimateReq,
  deleteEstimateReq,
  findEstimateReq,
  findEstimateReqListByCustomer,
  findEstimateReqListByMover,
};
