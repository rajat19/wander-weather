import { getCountriesData } from '@/lib/firebaseDataLoader';

export type VisaCategory = 'free' | 'voa' | 'evisa' | 'sticker' | 'none' | 'n/a' | 'other';

export const normalizeVisaRequirement = (raw: string): VisaCategory => {
  const v = (raw || '').trim().toLowerCase();
  if (v === '' || v === '-1') return 'n/a';
  if (/^\d+$/.test(v)) return 'free';
  if (v === 'visa free' || v === 'freedom of movement') return 'free';
  if (v === 'visa on arrival') return 'voa';
  if (v === 'e-visa' || v === 'evisa' || v === 'eta') return 'evisa';
  if (v === 'visa required') return 'sticker';
  if (v === 'no admission' || v === 'ban') return 'none';
  return 'other';
};

export const VISA_COLORS: Record<VisaCategory, string> = {
  free: 'hsl(145, 60%, 45%)',     // green
  voa: 'hsl(35, 90%, 55%)',       // orange
  evisa: 'hsl(210, 75%, 55%)',    // blue
  sticker: 'hsl(0, 70%, 55%)',    // red
  none: 'hsl(0, 0%, 55%)',        // dark gray
  'n/a': 'hsl(0, 0%, 85%)',       // light gray
  other: 'hsl(270, 40%, 60%)',    // purple
};

// Special color for the passport holder's home country
export const HOME_COUNTRY_COLOR = 'hsl(280, 70%, 50%)'; // bright purple with white stripes pattern

export const getVisaColor = (category: VisaCategory): string => {
  return VISA_COLORS[category] || VISA_COLORS['other'];
};

/**
 * Build helper lookups between ISO codes and names using the existing countries data
 * Falls back to a static map if Firebase data is not yet loaded
 */
export const buildIso3ToNameMap = (): Record<string, string> => {
  // Start with comprehensive static map of ISO3 codes from the passport-index dataset
  const staticMap: Record<string, string> = {
    AFG: 'Afghanistan',
    AGO: 'Angola',
    ALB: 'Albania',
    AND: 'Andorra',
    ARE: 'United Arab Emirates',
    ARG: 'Argentina',
    ARM: 'Armenia',
    ATG: 'Antigua and Barbuda',
    AUS: 'Australia',
    AUT: 'Austria',
    AZE: 'Azerbaijan',
    BDI: 'Burundi',
    BEL: 'Belgium',
    BEN: 'Benin',
    BFA: 'Burkina Faso',
    BGD: 'Bangladesh',
    BGR: 'Bulgaria',
    BHR: 'Bahrain',
    BHS: 'Bahamas',
    BIH: 'Bosnia and Herzegovina',
    BLR: 'Belarus',
    BLZ: 'Belize',
    BOL: 'Bolivia',
    BRA: 'Brazil',
    BRB: 'Barbados',
    BRN: 'Brunei',
    BTN: 'Bhutan',
    BWA: 'Botswana',
    CAF: 'Central African Republic',
    CAN: 'Canada',
    CHE: 'Switzerland',
    CHL: 'Chile',
    CHN: 'China',
    CIV: 'Ivory Coast',
    CMR: 'Cameroon',
    COD: 'DR Congo',
    COG: 'Congo',
    COL: 'Colombia',
    COM: 'Comoros',
    CPV: 'Cape Verde',
    CRI: 'Costa Rica',
    CUB: 'Cuba',
    CYP: 'Cyprus',
    CZE: 'Czech Republic',
    DEU: 'Germany',
    DJI: 'Djibouti',
    DMA: 'Dominica',
    DNK: 'Denmark',
    DOM: 'Dominican Republic',
    DZA: 'Algeria',
    ECU: 'Ecuador',
    EGY: 'Egypt',
    ERI: 'Eritrea',
    ESP: 'Spain',
    EST: 'Estonia',
    ETH: 'Ethiopia',
    FIN: 'Finland',
    FJI: 'Fiji',
    FRA: 'France',
    FSM: 'Micronesia',
    GAB: 'Gabon',
    GBR: 'United Kingdom',
    GEO: 'Georgia',
    GHA: 'Ghana',
    GIN: 'Guinea',
    GMB: 'Gambia',
    GNB: 'Guinea-Bissau',
    GNQ: 'Equatorial Guinea',
    GRC: 'Greece',
    GRD: 'Grenada',
    GTM: 'Guatemala',
    GUY: 'Guyana',
    HKG: 'Hong Kong',
    HND: 'Honduras',
    HRV: 'Croatia',
    HTI: 'Haiti',
    HUN: 'Hungary',
    IDN: 'Indonesia',
    IND: 'India',
    IRL: 'Ireland',
    IRN: 'Iran',
    IRQ: 'Iraq',
    ISL: 'Iceland',
    ISR: 'Israel',
    ITA: 'Italy',
    JAM: 'Jamaica',
    JOR: 'Jordan',
    JPN: 'Japan',
    KAZ: 'Kazakhstan',
    KEN: 'Kenya',
    KGZ: 'Kyrgyzstan',
    KHM: 'Cambodia',
    KIR: 'Kiribati',
    KNA: 'Saint Kitts and Nevis',
    KOR: 'South Korea',
    KWT: 'Kuwait',
    LAO: 'Laos',
    LBN: 'Lebanon',
    LBR: 'Liberia',
    LBY: 'Libya',
    LCA: 'Saint Lucia',
    LIE: 'Liechtenstein',
    LKA: 'Sri Lanka',
    LSO: 'Lesotho',
    LTU: 'Lithuania',
    LUX: 'Luxembourg',
    LVA: 'Latvia',
    MAC: 'Macao',
    MAR: 'Morocco',
    MCO: 'Monaco',
    MDA: 'Moldova',
    MDG: 'Madagascar',
    MDV: 'Maldives',
    MEX: 'Mexico',
    MHL: 'Marshall Islands',
    MKD: 'North Macedonia',
    MLI: 'Mali',
    MLT: 'Malta',
    MMR: 'Myanmar',
    MNE: 'Montenegro',
    MNG: 'Mongolia',
    MOZ: 'Mozambique',
    MRT: 'Mauritania',
    MUS: 'Mauritius',
    MWI: 'Malawi',
    MYS: 'Malaysia',
    NAM: 'Namibia',
    NER: 'Niger',
    NGA: 'Nigeria',
    NIC: 'Nicaragua',
    NLD: 'Netherlands',
    NOR: 'Norway',
    NPL: 'Nepal',
    NRU: 'Nauru',
    NZL: 'New Zealand',
    OMN: 'Oman',
    PAK: 'Pakistan',
    PAN: 'Panama',
    PER: 'Peru',
    PHL: 'Philippines',
    PLW: 'Palau',
    PNG: 'Papua New Guinea',
    POL: 'Poland',
    PRK: 'North Korea',
    PRT: 'Portugal',
    PRY: 'Paraguay',
    PSE: 'Palestine',
    QAT: 'Qatar',
    ROU: 'Romania',
    RUS: 'Russia',
    RWA: 'Rwanda',
    SAU: 'Saudi Arabia',
    SDN: 'Sudan',
    SEN: 'Senegal',
    SGP: 'Singapore',
    SLB: 'Solomon Islands',
    SLE: 'Sierra Leone',
    SLV: 'El Salvador',
    SMR: 'San Marino',
    SOM: 'Somalia',
    SRB: 'Serbia',
    SSD: 'South Sudan',
    STP: 'Sao Tome and Principe',
    SUR: 'Suriname',
    SVK: 'Slovakia',
    SVN: 'Slovenia',
    SWE: 'Sweden',
    SWZ: 'Swaziland',
    SYC: 'Seychelles',
    SYR: 'Syria',
    TCD: 'Chad',
    TGO: 'Togo',
    THA: 'Thailand',
    TJK: 'Tajikistan',
    TKM: 'Turkmenistan',
    TLS: 'Timor-Leste',
    TON: 'Tonga',
    TTO: 'Trinidad and Tobago',
    TUN: 'Tunisia',
    TUR: 'Turkey',
    TUV: 'Tuvalu',
    TWN: 'Taiwan',
    TZA: 'Tanzania',
    UGA: 'Uganda',
    UKR: 'Ukraine',
    URY: 'Uruguay',
    USA: 'United States',
    UZB: 'Uzbekistan',
    VAT: 'Vatican',
    VCT: 'Saint Vincent and the Grenadines',
    VEN: 'Venezuela',
    VNM: 'Vietnam',
    VUT: 'Vanuatu',
    WSM: 'Samoa',
    XKX: 'Kosovo',
    YEM: 'Yemen',
    ZAF: 'South Africa',
    ZMB: 'Zambia',
    ZWE: 'Zimbabwe',
  };
  
  // Merge with Firebase data if available (Firebase names take precedence)
  const countries = getCountriesData();
  const firebaseMap: Record<string, string> = {};
  for (const c of countries) {
    if (c.alternativeCodes?.alpha3) {
      firebaseMap[c.alternativeCodes.alpha3] = c.name;
    }
  }
  
  // Return merged map: static as base, Firebase overrides
  return { ...staticMap, ...firebaseMap };
};

export const buildNumericToIso3Map = (): Record<string, string> => {
  const countries = getCountriesData();
  const map: Record<string, string> = {};
  for (const c of countries) {
    const iso3 = c.alternativeCodes?.alpha3;
    const numeric = c.alternativeCodes?.numeric;
    if (!iso3 || !numeric) continue;
    const numStr = String(numeric);
    map[numStr] = iso3;
    // also add left-padded 3-digit
    if (numStr.length < 3) {
      map[numStr.padStart(3, '0')] = iso3;
    }
  }
  
  // If Firebase data didn't load or is incomplete, use comprehensive static mapping
  // Based on ISO 3166-1 numeric codes
  const staticMap: Record<string, string> = {
    '4': 'AFG', '8': 'ALB', '12': 'DZA', '20': 'AND', '24': 'AGO',
    '28': 'ATG', '31': 'AZE', '32': 'ARG', '36': 'AUS', '40': 'AUT',
    '44': 'BHS', '48': 'BHR', '50': 'BGD', '51': 'ARM', '52': 'BRB',
    '56': 'BEL', '60': 'BMU', '64': 'BTN', '68': 'BOL', '70': 'BIH',
    '72': 'BWA', '76': 'BRA', '84': 'BLZ', '90': 'SLB', '96': 'BRN',
    '100': 'BGR', '104': 'MMR', '108': 'BDI', '112': 'BLR', '116': 'KHM',
    '120': 'CMR', '124': 'CAN', '132': 'CPV', '140': 'CAF', '144': 'LKA',
    '148': 'TCD', '152': 'CHL', '156': 'CHN', '158': 'TWN', '170': 'COL',
    '174': 'COM', '178': 'COG', '180': 'COD', '188': 'CRI', '191': 'HRV',
    '192': 'CUB', '196': 'CYP', '203': 'CZE', '204': 'BEN', '208': 'DNK',
    '212': 'DMA', '214': 'DOM', '218': 'ECU', '222': 'SLV', '226': 'GNQ',
    '231': 'ETH', '232': 'ERI', '233': 'EST', '242': 'FJI', '246': 'FIN',
    '250': 'FRA', '262': 'DJI', '266': 'GAB', '268': 'GEO', '270': 'GMB',
    '275': 'PSE', '276': 'DEU', '288': 'GHA', '296': 'KIR', '300': 'GRC',
    '308': 'GRD', '320': 'GTM', '324': 'GIN', '328': 'GUY', '332': 'HTI',
    '336': 'VAT', '340': 'HND', '344': 'HKG', '348': 'HUN', '352': 'ISL',
    '356': 'IND', '360': 'IDN', '364': 'IRN', '368': 'IRQ', '372': 'IRL',
    '376': 'ISR', '380': 'ITA', '384': 'CIV', '388': 'JAM', '392': 'JPN',
    '398': 'KAZ', '400': 'JOR', '404': 'KEN', '408': 'PRK', '410': 'KOR',
    '414': 'KWT', '417': 'KGZ', '418': 'LAO', '422': 'LBN', '426': 'LSO',
    '428': 'LVA', '430': 'LBR', '434': 'LBY', '438': 'LIE', '440': 'LTU',
    '442': 'LUX', '446': 'MAC', '450': 'MDG', '454': 'MWI', '458': 'MYS',
    '462': 'MDV', '466': 'MLI', '470': 'MLT', '478': 'MRT', '480': 'MUS',
    '484': 'MEX', '492': 'MCO', '496': 'MNG', '498': 'MDA', '499': 'MNE',
    '504': 'MAR', '508': 'MOZ', '512': 'OMN', '516': 'NAM', '520': 'NRU',
    '524': 'NPL', '528': 'NLD', '548': 'VUT', '554': 'NZL', '558': 'NIC',
    '562': 'NER', '566': 'NGA', '570': 'NIU', '578': 'NOR', '583': 'FSM',
    '584': 'MHL', '585': 'PLW', '586': 'PAK', '591': 'PAN', '598': 'PNG',
    '600': 'PRY', '604': 'PER', '608': 'PHL', '616': 'POL', '620': 'PRT',
    '624': 'GNB', '626': 'TLS', '634': 'QAT', '642': 'ROU', '643': 'RUS',
    '646': 'RWA', '659': 'KNA', '662': 'LCA', '670': 'VCT', '674': 'SMR',
    '678': 'STP', '682': 'SAU', '686': 'SEN', '688': 'SRB', '690': 'SYC',
    '694': 'SLE', '702': 'SGP', '703': 'SVK', '704': 'VNM', '705': 'SVN',
    '706': 'SOM', '710': 'ZAF', '716': 'ZWE', '724': 'ESP', '728': 'SSD',
    '729': 'SDN', '732': 'ESH', '740': 'SUR', '748': 'SWZ', '752': 'SWE',
    '756': 'CHE', '760': 'SYR', '762': 'TJK', '764': 'THA', '768': 'TGO',
    '776': 'TON', '780': 'TTO', '784': 'ARE', '788': 'TUN', '792': 'TUR',
    '795': 'TKM', '798': 'TUV', '800': 'UGA', '804': 'UKR', '807': 'MKD',
    '818': 'EGY', '826': 'GBR', '831': 'GGY', '832': 'JEY', '833': 'IMN',
    '834': 'TZA', '840': 'USA', '850': 'VIR', '854': 'BFA', '858': 'URY',
    '860': 'UZB', '862': 'VEN', '876': 'WLF', '882': 'WSM', '887': 'YEM',
    '894': 'ZMB', '999': 'XKX',
    // Padded versions
    '004': 'AFG', '008': 'ALB', '012': 'DZA', '016': 'ASM', '020': 'AND',
    '024': 'AGO', '028': 'ATG', '031': 'AZE', '032': 'ARG', '036': 'AUS',
    '040': 'AUT', '044': 'BHS', '048': 'BHR', '050': 'BGD', '051': 'ARM',
    '052': 'BRB', '056': 'BEL', '060': 'BMU', '064': 'BTN', '068': 'BOL',
    '070': 'BIH', '072': 'BWA', '076': 'BRA', '084': 'BLZ', '090': 'SLB',
    '096': 'BRN',
  };
  
  // Merge: prefer Firebase data, fallback to static
  return Object.keys(staticMap).length > Object.keys(map).length 
    ? { ...staticMap, ...map }
    : { ...map, ...staticMap };
};


