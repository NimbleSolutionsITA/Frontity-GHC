import React, {useEffect, useState} from "react";
import translations from "../../../translations";
import {Box, MenuItem, Select, TextField} from "@material-ui/core";


function getCurrentMonthName(month, lang) {
    return new Date(2000, month, 1).toLocaleString(lang, { month: 'long' })
}

const Filters = ({documents, setFilteredDocuments, id, lang, routerLink}) => {
    documents[id].map(d => ({date: d.date.getMonth(), name: d.date.toLocaleString(lang, { month: 'long' })})).sort()
    const [year, setYear] = useState(translations(lang, 'anno'))
    const [month, setMonth] = useState(translations(lang, 'mese'))
    const [search, setSearch] = useState('')
    const years = documents[id] ? [...new Set(documents[id].map(d=> d.date.getFullYear()))] : []
    const months = documents[id] ? [...new Set(documents[id].map(d=> d.date.getMonth()))].sort((a, b) => a - b) : []
    const handleSearch = (event) => setSearch(event.target.value)
    const handleFilterByMonth = (event) => setMonth(event.target.value)
    const handleFilterByYear = (event) => setYear(event.target.value)

    useEffect(() => {
        if (documents[id] && documents[id].length > 10)
            setYear(Math.max(...years))
    }, [])

    useEffect(() => {
        if (documents[id])
            setFilteredDocuments(d => ({
                ...d,
                [id]: documents[id].filter(d =>
                    (!search || d.label.toLowerCase().includes(search.toString().toLowerCase())) &&
                    (year === translations(lang, 'anno') || d.date.getFullYear() === year) &&
                    (month === translations(lang, 'mese') || d.date.getMonth() === month)
                )
            }))
    }, [month, year, search, routerLink])

    return (
        <Box
            marginTop="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{xs: 'column-reverse', md: 'row'}}
        >
            <TextField
                fullWidth
                style={{maxWidth: '750px'}}
                value={search}
                onChange={handleSearch}
                variant="outlined"
                placeholder={translations(lang, 'search')}
            />
            <Box display="flex" marginBottom={{xs: '20px', md: 0}}>
                {months.length > 1 && (
                    <Select
                        style={{margin: '0 30px'}}
                        value={month}
                        onChange={handleFilterByMonth}
                        variant="outlined"
                    >
                        {documents[id] && [translations(lang, 'mese'), ...months].map((month, index) => (
                            <MenuItem key={month} value={month}>
                                {index === 0 ? translations(lang, 'mese') : getCurrentMonthName(month, lang)}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                {years.length > 1 && (
                    <Select
                        value={year}
                        onChange={handleFilterByYear}
                        variant="outlined"
                    >
                        {documents[id] && [translations(lang, 'anno'), ...years].map(year => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </Box>
        </Box>
    )
}

export default Filters