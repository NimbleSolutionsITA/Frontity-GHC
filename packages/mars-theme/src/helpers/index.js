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


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export function checkIsNextDate(d1, d2) {
    return d2.getFullYear() < d1.getFullYear() || (
        d2.getFullYear() === d1.getFullYear() && d2.getMonth() < d1.getMonth()
    ) || (
        d2.getFullYear() === d1.getFullYear() && d2.getMonth() === d1.getMonth() && d2.getDate() <= d1.getDate()
    )
}

export function checkIsSameDate(d1, d2) {
    return d2.getFullYear() === d1.getFullYear() && d2.getMonth() === d1.getMonth() && d2.getDate() === d1.getDate()
}