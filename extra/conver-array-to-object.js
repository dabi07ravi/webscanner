const fs = require('fs');
let urls = [
    "https://s23.a2zinc.net/clients/AmericanGasAssociation/AGAOPS2024/Public/EventMap.aspx?shMode=E&ID=202&sortMenu=103002",
    "https://s23.a2zinc.net/clients/CC/ABS2024/Public/EventMap.aspx?shavailable=1&ID=633&sortMenu=102001",
    "https://s19.a2zinc.net/clients/ausa/annual2024/Public/EventMap.aspx?shMode=E",
    "https://boutique.a2zinc.net/BDNY2024/Public/eventmap.aspx?shMode=E&ID=42437&_ga=2.110364551.300156385.1680114298-640604327.1680114298",
    "https://exhibitors.cabsat.com/cabsat-2024/Exhibitor",
    "https://cedia.a2zinc.net/CEDIA2024/Public/eventmap.aspx?",
    "https://s23.a2zinc.net/clients/awea/CP2024/Public/eventmap.aspx?shmode=E",
    "https://s19.a2zinc.net/clients/informabeauty/Cosmoprof2024/public/eventmap.aspx?shAvailable=1",
    "https://s36.a2zinc.net/clients/SME/EASTEC2024/public/eventmap.aspx?",
    "https://www.intersolar.us/2024-exhibitors/",
    "https://ecatalogue.firabarcelona.com/equiplast2024/home?filter=ONLY_EXHIBITORS&lang=en_GB",
    "https://www.e-world-essen.com/fileadmin/groups/1/Pdfs/de/2024/E-world_Hallenplan.pdf",
    "https://exphotel.infoexpo.com.mx/2024/ae/web/plano/public",
    "https://s36.a2zinc.net/clients/Newcom/ExpoCam2024/Public/eventmap.aspx?shAvailable=1",
    "https://www.farmshopanddelishow.co.uk/exhibitors-2024#/exhibitors/",
    "https://events.clarionevents.com/fdic2024/Public/EventMap.aspx?",
    "https://s23.a2zinc.net/clients/corcexpo/FNCE2024/Public/EventMap.aspx?shMode=E&ID=11201&sortMenu=102000",
    "https://s36.a2zinc.net/clients/IAFC/fri2024/Public/eventmap.aspx?sh",
    "https://s23.a2zinc.net/clients/informaconnect/gice2024/Public/EventMap.aspx?shAvailable=1",
    "https://www.hdaw.org/2024/Public/eventmap.aspx?ID=2016&shAvailable=1&sortMenu=102003",
    "https://s36.a2zinc.net/clients/SME/HOUSTEX2024/public/Eventmap.aspx?",
    "https://events.clarionevents.com/hvi2024/Public/eventmap.aspx?shMode=E&ID=80382",
    "https://exhibits.iitsec.org/2024/public/eventmap.aspx?shMode=E&ID=39557&sortMenu=104000",
    "https://s36.a2zinc.net/clients/questex/IECSCFL2024/Public/EventMap.aspx?shMode=E",
    "https://s23.a2zinc.net/clients/IIAR/2024IIAR/Public/EventMap.aspx?shMode=E&ID=344",
    "https://fastener.a2zinc.net/IFE2024/Public/eventmap.aspx?",
    "https://www.japan-it.jp/spring/en-gb/search/2024/directory.html#/",
    "https://lf2024.mapyourshow.com/8_0/floorplan/index.cfm?hallID=&selectedBooth=",
    "https://mats2024.mapyourshow.com/8_0/floorplan/index.cfm",
    "https://milcom2024.milcom.org/patrons-exhibitors/exhibitors",
    "https://www.mipim.com/content/dam/sitebuilder/rm/mipim/2024/practical-info/Floorplan_mipim_web.pdf.coredownload.778343593.pdf",
    "https://moneyus2024visitorview.coconnex.com/",
    "https://s23.a2zinc.net/clients/NAFEM/NAFEM2024/Public/eventmap.aspx?shmode=E",
    "https://www.npgaexpo.org/2024/Public/EventMap.aspx",
    "https://congress.nsc.org/nsc2024/public/eventmap.aspx?shmode=E&ID=7275&sortMenu=103004",
    "https://nynow.a2zinc.net/Winter2024/Public/exhibitors.aspx?ID=41488",
    "https://www.overlandexpo.com/sponsors-exhibitors/overland-expo-pnw-2024/",
    "https://events.clarionevents.com/pgi2024/Public/eventmap.aspx",
    "https://rice.a2zinc.net/rice2024/public/eventmap.aspx?shMode=E",
    "https://divcomevents3-static.s3.amazonaws.com/uploads/2022/09/Floor-plan-2024-SENA-SPNA.pdf",
    "https://fp37.a2zinc.net/clients/fpUBM/SCG2024/Public/eventmap.aspx?",
    "https://events.secureworld.io/agenda/boston-ma-2024/?show=exhibitors-info",
    "https://expo.semi.org/west2024/Public/EventMap.aspx?shMode=E&MapID=460",
    "https://s36.a2zinc.net/clients/SME/SOUTHTEC2024/Public/EventMap.aspx?",
    "https://exhibits.spe.org/ATCE2024/Public/eventmap.aspx?sh",
    "https://stafda2024.expotracker.net/exhibit/",
    "https://s23.a2zinc.net/clients/endeavor/stormcon2024/Public/EventMap.aspx?",
    "https://s23.a2zinc.net/clients/WPA/SZ2024/Public/EventMap.aspx?shMode=E",
    "https://west.supplysideshow.com/en/exhibitor-list/floorplan2024.html",
    "https://s23.a2zinc.net/clients/informaconnect/the-buildings-show2024/Public/EventMap.aspx?",
    "https://www.theenergyexpo.com/2024/EN_Floorplan/",
    "https://www.thewaterexpo.com/2024/EN_Floorplan/",
    "https://ipw2024.mapyourshow.com/8_0/floorplan/",
    "https://s36.a2zinc.net/clients/SME/WESTEC2024/Public/eventmap.aspx?",
    "https://westerncoatings.org/exhibitor-info-for-2024/#floor-plan"
];



let urlObjects = urls.map(url => ({ url }));

// Function to write the data to a file
function writeToFile(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4));
}

writeToFile('output.json', urlObjects);
