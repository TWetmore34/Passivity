import PieGraph from "./PieGraph"
import Calculator from "./Calculator"
import CalcEntry from './CalcEntry';

import { GET_USER } from '../utils/queries'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from "react";


const Portfolio = () => {
    const { data } = useQuery(GET_USER)
    const [user, setUser] = useState()
    // set user info on page load
    useEffect(() => {
        if(data){
        setUser(data.me)
        console.log(user)
        }
    })

    return (
        <div>
            <div className="flex items-center justify-center h-screen">

                <div className="bg-slate-200 text-slate-500 font-bold rounded-lg border shadow-lg p-10">

                    <PieGraph />
                    <Calculator />
                    <CalcEntry symbol={'test'} holding={'test'} />

                </div>

            </div>
        </div>
    )
}

export default Portfolio