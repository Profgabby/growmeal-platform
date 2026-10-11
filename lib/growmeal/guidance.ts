export type Guidance={title:string;summary:string;status:'Evidence-informed pilot'|'Regional validation required';sourceTitle:string;sourceUrl:string;sourceYear:string};
const iita='https://www.iita.org/wp-content/uploads/2016/06/Growing_cassava_commercially_in_Nigeria_an_illustrated_guide.pdf';
const fao='https://www.fao.org/giews/countrybrief/country.jsp?code=NG';
const calendar='https://www.fao.org/agriculture/crops/information-resources/de/';
export function getGrowingGuidance(country:string,region:string,crop:string):Guidance{
 if(country==='Nigeria'&&crop==='Cassava'){
  return {title:'Cassava planting: rainfall first',summary:'IITA guidance links cassava establishment to the start of reliable seasonal rains. Its broad regional examples are April–May for the main growing season in bimodal zones and May–June in savannah zones. These are NOT state-specific dates: confirm rainfall onset, local variety and planting material with an extension adviser before planting.',status:'Evidence-informed pilot',sourceTitle:'IITA — Growing cassava commercially in Nigeria',sourceUrl:iita,sourceYear:'2016'};
 }
 if(country==='Nigeria'&&crop==='Maize'){
  return {title:'Maize planting: local rainy-season pattern matters',summary:'FAO describes southern and central Nigeria as having areas with two rainy seasons, while northern areas generally have one main rainy season. Planting decisions require current rainfall onset, crop variety and local advisories. No exact planting date is assigned to '+(region||'your location')+'.',status:'Evidence-informed pilot',sourceTitle:'FAO GIEWS — Nigeria country brief (September 2026)',sourceUrl:fao,sourceYear:'2026'};
 }
 return {title:'Local growing calendar needs validation',summary:'This crop is in the educational catalog, but there is no verified crop-by-location planting window for '+(region||country)+'. Check local rainfall onset, soil, variety, water availability and extension guidance before choosing planting dates. We will not invent a calendar.',status:'Regional validation required',sourceTitle:'FAO Crop Calendar and Ecocrop resources',sourceUrl:calendar,sourceYear:'Reference resource'};
}
