
const modifyRoutine = (routine) => {
    const getday = (routines, day) => {

        return routines.filter((singleRoutine) => singleRoutine.day === day);
    };

    const modifiedRoutine = [];
    const day = [
        "শনিবার",
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",

    ];
    day.map((singleDay) => { // Use slice to create a copy of the array without modifying the original
        const mappedDay = getday(routine, singleDay);

        // Sort routines based on priority in descending order


        // Fill in with empty objects to make the length 7
        const mainnum = [1, 2, 3, 4, 5, 6, 7];
        const a = [];
        for (index of mappedDay) {
            a.push(index.priority)
        }

        const result = mainnum.filter((element) => !a.includes(element));
        result.map((b) => mappedDay.push({ priority: b }))

        mappedDay.sort((a, b) => a.priority - b.priority);

        modifiedRoutine.push(mappedDay);
    });
    return modifiedRoutine
}

export default modifyRoutine