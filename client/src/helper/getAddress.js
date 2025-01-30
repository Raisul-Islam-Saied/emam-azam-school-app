import divisions from "../data/divisions.json";
import districts from "../data/districts.json";
import upazilas from '../data/upazilas.json'
import unions from '../data/unions.json'
const getAddress = (name, id) => {
    if (name === "district") {

        const filter = districts.filter((distric) => {
            const filtered = distric.division_id === id
            return filtered
        })
        return filter
    }
    if (name === "upazila") {

        const filter = upazilas.filter((distric) => {
            const filtered = distric.district_id === id
            return filtered
        })
        return filter
    } if (name === "union") {

        const filter = unions.filter((distric) => {
            const filtered = distric.upazilla_id === id
            return filtered
        })
        return filter
    }

}
export default getAddress