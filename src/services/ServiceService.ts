import FilterDTO from "../dtos/FilterDTO";
import { ServiceDTO } from "../dtos/ServiceDTO";
import { Branch } from "../entity/Branch";
import { Member } from "../entity/Member";
import { Service } from "../entity/Service";
import ErrorHandler from "../models/ErrorHandler";

class ServiceService {
  static async getServices(filter: FilterDTO) {
    const { page, size } = filter;
    const [services, count] = await Service.findAndCount({
      skip: page,
      take: size,
      where: { deteled: false },
    });
    return { content: services, paged: { totalCount: count, page, size } };
  }

  static async createService(serviceDTO: ServiceDTO) {
    try {
      const service = new Service();
      service.title = serviceDTO.title;
      service.startTime = serviceDTO.startTime;
      service.endTime = serviceDTO.endTime;
      service.branch = await Branch.findOneOrFail(serviceDTO.branchId);

      return await service.save();
    } catch (error) {
      throw new ErrorHandler(400, "Could not create service", error);
    }
  }

  static async modifyService(serviceId: string, serviceDTO: ServiceDTO) {
    try {
      const service = await Service.findOneOrFail({
        where: { id: serviceId, deteled: false },
      });

      service.title = serviceDTO.title;
      service.startTime = serviceDTO.startTime;
      service.endTime = serviceDTO.endTime;
      service.branch = await Branch.findOneOrFail(serviceDTO.branchId);

      return await service.save();
    } catch (error) {
      throw new ErrorHandler(400, "Could not modify service", error);
    }
  }

  static async removeService(serviceId: string) {
    try {
      const service = await Service.findOneOrFail(serviceId);

      if (service.deteled) {
        throw new ErrorHandler(400, "Service does not exist");
      }

      service.deteled = true;
      return await service.save();
    } catch (error) {
      throw new ErrorHandler(400, "Could not remove service", error);
    }
  }

  static async addMemberToService(memberId: string, serviceId: string) {
    try {
      const member = await Member.findOneOrFail(memberId, {
        relations: ["branch"],
      });
      const service = await Service.findOneOrFail({
        relations: ["branch", "members"],
        where: { id: serviceId, deteled: false },
      });

      if (service.branch.id !== member.branch.id) {
        throw new ErrorHandler(
          400,
          "Member does not belong to service church branch"
        );
      }
      service.members.push(member);
      return await service.save();
    } catch (error) {
      throw new ErrorHandler(400, `Could not add member to service`, error);
    }
  }

  static async removeMemberFromService(memberId: string, serviceId: string) {
    try {
      const member = await Member.findOneOrFail(memberId, {
        relations: ["branch"],
      });
      const service = await Service.findOneOrFail({
        relations: ["branch", "members"],
        where: { id: serviceId, deteled: false },
      });
      service.members.filter(({ id }) => member.id !== id);
      return await service.save();
    } catch (error) {
      throw new ErrorHandler(400, `Could not remove member to service`, error);
    }
  }

  static isDeleted(service: Service) {
    return service.deteled;
  }
}

export default ServiceService;
