import { FastifyInstance } from "fastify";
import Postcontroller from "./post.controller";
import { $ref } from "./post.schema";


async function postRoutes(server: FastifyInstance) {
    server.post('/',
        {
            schema: {
                body: $ref("createPostSchema")
            }
        },
        Postcontroller.createPost
    )

    server.patch('/:id',
        {
            schema: {
                body: $ref("updatePostSchema"),
                params: $ref("idParamSchema")
            }
        },
        Postcontroller.updatePost
    )

    server.get('/',
        {
            schema: {
                querystring: $ref("getPostsQuerySchema")
            }
        },
        Postcontroller.getAllPosts
    )

    server.get('/:id',
        {
            schema: {
                params: $ref("idParamSchema")
            }
        },
        Postcontroller.getPost
    )

    server.delete('/:id',
        {
            schema: {
                params: $ref("idParamSchema")
            }
        },
        Postcontroller.deletePost
    )
}

export default postRoutes;
