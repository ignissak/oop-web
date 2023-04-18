import type { Load } from '@sveltejs/kit'

export const prerender = false
export const ssr = false

export const load: Load = ({ params }) => {
    const id = params.id

    return {
        id,
    }
}