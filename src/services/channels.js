import { Channels } from "../models/channels.js";
import { ChannelsRepository } from "../repositories/channels.js";
import { ForbiddenError } from "../utils/errors.js";

export const ChannelService = {
    getAllChannels: async () => { 
        const channels = await ChannelsRepository.findAll();

        return Channels.fromArray(channels);
    },

    createChannel: async (dto) => { 
        const newChannel = new Channels(dto);

        const savedChannel = await ChannelsRepository.create(newChannel);

        return savedChannel;
    },

    updateChannel: async (id, dto) => {
        throw new ForbiddenError("Not implemented.");
    },

    deleteChannel: async (id) => {
        throw new ForbiddenError("Not implemented.");
    },
};