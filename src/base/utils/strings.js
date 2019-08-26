const isDev = true;

const isSecure = true;

const isMandatory = " is required";


const api = {
  
    oyeSafeDomain:isDev?"apidev.oyespace.com/oyesafe":"apidev.oyespace.com/oye247",
    oyeDomain:isDev?"apidev.oyespace.com/oyeliving":"apidev.oyespace.com/oyeliving",
    oyeLivingDomain:isDev?"apidev.oyespace.com":"OyeLivingApi.oyespace.com",
    oyeServiceAgentDomain:isDev?"apidev.oyespace.com/serviceagent":"apidev.oyespace.com/serviceagent",
    protocol:isSecure?"https://":"http://",
    oyeSafeApiPath:"/api/v1/",
    oyeLivingApiPath:"/oyeliving/api/v1/",
    oyeSafeKey:'7470AD35-D51C-42AC-BC21-F45685805BBE',
    oyeLivingKey:'1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1',
    oyeServiceAgnetKey : '48D874E6-535B-4AB8-8F1D-6CFD4072580F',
    
};

const strings = {
    appName:"OyeSpace",
    oyeSafeUrl:api.protocol+api.oyeSafeDomain+api.oyeSafeApiPath,
    oyeLivingUrl:api.protocol+api.oyeLivingDomain+api.oyeLivingApiPath,
    oyeServiceAgentUrl: api.protocol+api.oyeServiceAgentDomain+api.oyeSafeApiPath,
    oyeServiceAgentApiKey: api.oyeServiceAgnetKey,
    oyeSafeApiKey:api.oyeSafeKey,
    oyeLivingApiKey:api.oyeLivingKey
};


export default strings;