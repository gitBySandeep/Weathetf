export const fetchdata = async (req, res) => {
    const search = req.body.search
    console.log(search);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c4b557743e63afc9f302a19889af4261`
    // const url =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${search}&cnt=16&appid=c4b557743e63afc9f302a19889af4261`
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=66766eb4593dce5fda011c772840f994`
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    if (data) {
        return res.json({ result: data})
    }
    else {
        return res.send("no data found");
    }
}