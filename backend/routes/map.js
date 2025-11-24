import { Router } from 'express';
import axios from 'axios';

var router = Router();

/* GET home page. */
router.get('/address-from-coords/:coords', async(req, res)=> {
  const API_KEY = process.env.API_KEY;
  const coords = req.params.coords;
  try{
    const mapResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${API_KEY}`)
    const data = mapResponse.data;
    const address = data.results[0].address_components

    const formattedData = {}
    address.forEach((item)=>{
      console.log(item)
      if(item.types.includes("street_number")){
        formattedData.street_num = item.short_name
      }
      if(item.types.includes("route")){
        formattedData.street_name = item.short_name
      }
      if(item.types.includes("sublocality")){
        formattedData.city = item.short_name
      }
      if(item.types.includes("administrative_area_level_1")){
        formattedData.state = item.short_name
      }
      if(item.types.includes("postal_code")){
        formattedData.zip = item.short_name
      }
    })

    res.json(formattedData)
  
  } catch(err){
    console.log(err)
  }
});

export default router;