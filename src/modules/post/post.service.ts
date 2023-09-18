import prisma from "../../utils/prisma";
import { CreatePostType, UpdatePostType } from "./post.schema";


export async function createPost(data: CreatePostType) {
    const post = await prisma.post.create({ data });
    return post;
}

export async function findeAllPosts(limit = 10, page = 1) {
    if (limit > 20) limit = 20;
    const skip = (page - 1) * limit;
    const [data, count] = await Promise.all([
        prisma.post.findMany({
            skip, take: limit
        }),
        prisma.post.count()
    ]);
    return [data, count]
}

export async function findPost(id: number) {
    return prisma.post.findFirst({ where: { id } });
}

export async function updatePost(id: number, post: UpdatePostType) {
    return prisma.post.update({ where: { id }, data: post })
}

export async function deletePost(id: number) {
    try {
        const data = await prisma.post.delete({ where: { id } });
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
}
