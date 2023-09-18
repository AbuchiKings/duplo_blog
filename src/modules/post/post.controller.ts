import { FastifyReply, FastifyRequest } from "fastify";

import * as Post from './post.service'
import { CreatePostType, GetPostsType, UpdatePostType } from "./post.schema";
import { CreatedSuccessResponse, SuccessResponse } from "../../utils/ApiResponse";
import { NotFoundError } from "../../utils/ApiError";

class Postcontroller {
    public static async createPost(req: FastifyRequest<{ Body: CreatePostType }>, res: FastifyReply) {
        const { title, content, author } = req.body;
        const data = await Post.createPost({ title, content, author });
        return new CreatedSuccessResponse('Post successfully created', data, 1).send(res);
    }

    public static async updatePost(req: FastifyRequest<{ Body: UpdatePostType, Params: { id: number } }>, res: FastifyReply) {
        const { title, content, author } = req.body;
        const data = await Post.updatePost(req.params.id, { title, content, author });
        if (!data) throw new NotFoundError('Post not found');
        return new SuccessResponse('Post successfully updated', data, 1).send(res);
    }

    public static async getAllPosts(req: FastifyRequest<{ Querystring: GetPostsType }>, res: FastifyReply) {

        const { limit, page } = req.query;
        const [ data, count] = await Post.findeAllPosts(limit, page);
        //@ts-ignore
        return new SuccessResponse('Success', data, count).send(res);
    }

    public static async getPost(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
        const { id } = req.params;
        const data = await Post.findPost(id);
        if (!data) throw new NotFoundError('Post not found');
        return new SuccessResponse('Post successfully retrieved', data, 1).send(res);
    }

    public static async deletePost(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {

        try {
            const { id } = req.params;
            const data = await Post.deletePost(id);
            if (!data) throw new NotFoundError('Post not found');
            return new SuccessResponse('Post successfully deleted', null, 1).send(res);
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new NotFoundError('Post not found');
            }

        }
    }
}

export default Postcontroller;