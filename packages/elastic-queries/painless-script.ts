// POST /redspher-logs-api-gateway-prod/_search
export default {
  "size": 0,
  "query": {
    "bool": {
      "must": [
        { "term": { "domain_name": "shipperportal.flash.global" } },
        { "range": { "@timestamp": { "gt": "2025-06-15T00:00:00" } } },
        { "range": { "status_code.double": { "gte": 200, "lt": 300 } } }
      ]
    }
  },
  "aggs": {
    "normalized_paths": {
      "terms": {
        "script": {
          "source": `"""
            String path = doc['path.keyword'].value;
            if (path == null) return null;

            def tokens = new java.util.StringTokenizer(path, "/");
            List parts = new ArrayList();
            while (tokens.hasMoreTokens()) {
              parts.add(tokens.nextToken());
            }

            if (parts.size() >= 6 &&
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(3) == 'orders' &&
                parts.get(5) == 'references') {
              return "/stage/api/{id1}/orders/{id2}/references";
            }

            if (parts.size() >= 6 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(2) == 'v2' &&
                parts.get(4) == 'orders') {
              return "/stage/api/v2/{id1}/orders/{id2}";
            }

             if (parts.size() >= 5 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(2) == 'v2' &&
                parts.get(4) == 'order') {
              return "/stage/api/v2/{id1}/order";
            }

              if (parts.size() >= 6 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(2) == 'public' &&
                parts.get(3) == 'quotes' &&
                parts.get(4) == 'email') {
              return "/stage/api/public/quotes/email/{id1}";
            }

            if (parts.size() >= 5 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(3) == 'quotes' &&
                parts.get(4) == 'vehicle-types') {
              return "/stage/api/{id1}/quotes/vehicle-types";
            }

              if (parts.size() >= 5 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(2) == 'v2' &&
                parts.get(4) == 'request') {
              return "/stage/api/v2/{id1}/quotes/request";
            }

            if (parts.size() >= 4 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(3) == 'sendmail') {
              return "/stage/api/{id1}/sendmail";
            }

            if (parts.size() >= 6 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(3) == 'favourites' &&
                parts.get(4) == 'address') {
              return "/stage/api/{id1}/favourites/address/{id2}";
            }

             if (parts.size() >= 6 && 
                parts.get(0) == 'stage' &&
                parts.get(1) == 'api' &&
                parts.get(3) == 'quotes' &&
                parts.get(5) == 'cancel') {
              return "/stage/api/{id1}/quotes/{id2}/cancel";
            }

            return path;
          """`,
          "lang": "painless"
        },
        "size": 1000,
        "order": {
          "max_ts": "desc"
        }
      },
      "aggs": {
        "max_ts": {
          "max": {
            "field": "@timestamp"
          }
        },
        "doc_count": {
          "value_count": {
            "field": "path.keyword"
          }
        },
        "unique_client_ips": {
          "terms": {
            "field": "client_ip.keyword",
            "size": 1000
          }
        }
      }
    }
  }
};