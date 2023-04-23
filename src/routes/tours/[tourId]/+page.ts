import type { Load } from '@sveltejs/kit'

export const prerender = false;
export const ssr = false;

export const load: Load = async ( { params }) => {
    const tourId = params.tourId

    return {
        tourId
    }
}