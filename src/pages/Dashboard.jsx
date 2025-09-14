import Navbar from "../components/common/Navbar"
import ProductsTable from "../components/Dashboard/Datatable"
import RevenueChart from "../components/Dashboard/LineChart"
import CategoryPieChart from "../components/Dashboard/PieChart"
import StatsCards from "../components/Dashboard/Stats"
export default function Dashboard(){
    return(
        <div className="bg-black">
            <Navbar/>
            <StatsCards/>
            <RevenueChart/>
            <ProductsTable/>
        </div>
    )
}