import Lead, {
  ILead,
  LeadSource,
  LeadStatus,
} from "../models/lead.model";
import { UserRole } from "../models/user.model";

interface CreateLeadInput {
  name: string;
  email: string;
  source: LeadSource;
  status?: LeadStatus;
  createdBy: string;
}

interface UpdateLeadInput {
  name?: string;
  email?: string;
  source?: LeadSource;
  status?: LeadStatus;
}

interface GetLeadsQuery {
  page?: number;
  limit?: number;

  status?: LeadStatus;
  source?: LeadSource;

  search?: string;

  sort?: "latest" | "oldest";
}

class LeadService {
  // CREATE LEAD
  async createLead(data: CreateLeadInput) {
    const lead = await Lead.create(data);

    return lead;
  }

  // GET ALL LEADS
  async getLeads(query: GetLeadsQuery) {
    const {
      page = 1,
      limit = 10,

      status,
      source,

      search,

      sort = "latest",
    } = query;

    // FILTER OBJECT
    const filters: Record<string,any>= {};

    // STATUS FILTER
    if (status) {
      filters.status = status;
    }

    // SOURCE FILTER
    if (source) {
      filters.source = source;
    }

    // SEARCH FILTER
    if (search) {
      filters.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // SORTING
    let sortOption = {};

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    } else {
      sortOption = {
        createdAt: 1,
      };
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    // FIND LEADS
    const leads = await Lead.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email role");

    // TOTAL COUNT
    const totalLeads = await Lead.countDocuments(filters);

    return {
      leads,

      pagination: {
        total: totalLeads,
        page,
        limit,
        totalPages: Math.ceil(totalLeads / limit),
      },
    };
  }

  // GET SINGLE LEAD
  async getSingleLead(leadId: string) {
    const lead = await Lead.findById(leadId).populate(
      "createdBy",
      "name email role"
    );

    if (!lead) {
      throw new Error("Lead not found");
    }

    return lead;
  }

  // UPDATE LEAD
async updateLead(
  leadId: string,
  data: UpdateLeadInput,
  currentUserId: string,
  currentUserRole: UserRole
) {
  // FIND LEAD
  const lead = await Lead.findById(leadId);

  if (!lead) {
    const error: any = new Error(
      "Lead not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // OWNERSHIP CHECK
  if (
    currentUserRole !== UserRole.ADMIN &&
    lead.createdBy.toString() !==
      currentUserId
  ) {
    const error: any = new Error(
      "You are not authorized to update this lead"
    );

    error.statusCode = 403;

    throw error;
  }

  // UPDATE LEAD
  const updatedLead =
    await Lead.findByIdAndUpdate(
      leadId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  return updatedLead;
}

  // DELETE LEAD
  async deleteLead(leadId: string) {
    const lead = await Lead.findByIdAndDelete(
      leadId
    );

    if (!lead) {
      throw new Error("Lead not found");
    }

    return;
  }
}

export default new LeadService();