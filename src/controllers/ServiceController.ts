import { NextFunction, Request, Response } from "express";
import FilterDTO from "../dtos/FilterDTO";
import { ServiceDTO } from "../dtos/ServiceDTO";
import { GenericResponse } from "../models/GenericResponse";
import ServiceService from "../services/ServiceService";
import { validateDTO } from "../utils/validateDTO";

class ServiceController {
  static async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, paged } = await ServiceService.getServices(
        new FilterDTO(req)
      );
      res.send(
        new GenericResponse(200, "Services retreived successfully", {
          content,
          paged,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async createService(req: Request, res: Response, next: NextFunction) {
    const serviceDTO = new ServiceDTO(req.body);
    try {
      await validateDTO(serviceDTO);
      const service = await ServiceService.createService(serviceDTO);
      res.send(
        new GenericResponse(200, "Service creation successful", { service })
      );
    } catch (error) {
      next(error);
    }
  }

  static async modifyServices(req: Request, res: Response, next: NextFunction) {
    const serviceDTO = new ServiceDTO(req.body);
    const { serviceId } = req.params;
    try {
      await validateDTO(serviceDTO);
      const service = await ServiceService.modifyService(serviceId, serviceDTO);
      res.send(
        new GenericResponse(200, "Service modification successful", { service })
      );
    } catch (error) {
      next(error);
    }
  }

  static async removeService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      await ServiceService.removeService(serviceId);
      res.send(
        new GenericResponse(200, "Service removed successfully", { serviceId })
      );
    } catch (error) {
      next(error);
    }
  }

  static async addMemberToService(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { memberId, serviceId } = req.params;
      await ServiceService.addMemberToService(memberId, serviceId);
      res.send(
        new GenericResponse(200, "Member added to service successfully", {
          serviceId,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async removeMemberFromService(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { memberId, serviceId } = req.params;
      await ServiceService.removeMemberFromService(memberId, serviceId);
      res.send(
        new GenericResponse(200, "Member removed from service successfully", {
          serviceId,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ServiceController;
