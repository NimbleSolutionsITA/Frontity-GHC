import {categories} from "../config";

const getPostsFromCategory = ({post}, categoryId) =>
    Object.keys(post)
        .map(postId => post[postId])
        .filter(({categories}) => categories.includes(parseInt(categoryId)))

export const getPostsGroupedByCategory = (source, lang) => {
    return Object.keys(categories(lang))
        .reduce((acc, categoryId) => {
            const posts = getPostsFromCategory(source, categoryId)
            const category = source.category[categoryId]
            return [{posts, category}, ...acc]
        }, [])
}

const getServicesFromCategory = ({services}, categoryId) =>
    Object.keys(services)
        .map(postId => services[postId])
        .filter(({categories}) => categories.includes(parseInt(categoryId)))

export const getServicesGroupedByCategory = (source, lang) => {
    return Object.keys(categories(lang))
        .reduce((acc, categoryId) => {
            const services = getServicesFromCategory(source, categoryId)
            const category = source.category[categoryId]
            return [{services, category}, ...acc]
        }, [])
}

const getDoctorsFromCategory = ({doctors}, categoryId) =>
    Object.keys(doctors)
        .map(postId => doctors[postId])
        .filter(({categories}) => categories.includes(parseInt(categoryId)))

export const getDoctorsGroupedByCategory = (source, lang) => {
    return Object.keys(categories(lang))
        .reduce((acc, categoryId) => {
            const doctors = getDoctorsFromCategory(source, categoryId)
            const category = source.category[categoryId]
            return [{doctors, category}, ...acc]
        }, [])
}