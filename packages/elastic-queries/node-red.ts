import dns from 'dns/promises';

const esData = [
        {
          "key": "/stage/api/healthcheck",
          "doc_count": {
            "value": 78535
          },
          "max_ts": {
            "value": 1751530776318,
            "value_as_string": "2025-07-03T08:19:36.318Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "149.202.160.40",
                "doc_count": 26240
              },
              {
                "key": "108.128.208.107",
                "doc_count": 26216
              },
              {
                "key": "34.243.34.76",
                "doc_count": 147
              },
              {
                "key": "54.74.197.235",
                "doc_count": 147
              },
              {
                "key": "52.48.160.71",
                "doc_count": 146
              },
              {
                "key": "3.250.241.236",
                "doc_count": 145
              },
              {
                "key": "52.214.121.191",
                "doc_count": 145
              },
              {
                "key": "54.154.22.56",
                "doc_count": 145
              },
              {
                "key": "18.201.40.254",
                "doc_count": 144
              },
              {
                "key": "3.252.14.86",
                "doc_count": 144
              },
              {
                "key": "34.247.37.222",
                "doc_count": 144
              },
              {
                "key": "63.33.55.124",
                "doc_count": 144
              },
              {
                "key": "108.129.147.76",
                "doc_count": 143
              },
              {
                "key": "18.202.233.14",
                "doc_count": 143
              },
              {
                "key": "34.245.189.243",
                "doc_count": 143
              },
              {
                "key": "54.78.104.219",
                "doc_count": 143
              },
              {
                "key": "176.34.81.31",
                "doc_count": 142
              },
              {
                "key": "34.242.169.139",
                "doc_count": 142
              },
              {
                "key": "34.245.224.126",
                "doc_count": 142
              },
              {
                "key": "52.212.44.138",
                "doc_count": 142
              },
              {
                "key": "54.155.189.17",
                "doc_count": 142
              },
              {
                "key": "108.129.187.231",
                "doc_count": 141
              },
              {
                "key": "18.202.227.150",
                "doc_count": 141
              },
              {
                "key": "3.249.253.235",
                "doc_count": 141
              },
              {
                "key": "3.251.255.52",
                "doc_count": 141
              },
              {
                "key": "3.252.127.254",
                "doc_count": 141
              },
              {
                "key": "3.253.60.98",
                "doc_count": 141
              },
              {
                "key": "34.253.30.163",
                "doc_count": 141
              },
              {
                "key": "34.255.180.135",
                "doc_count": 141
              },
              {
                "key": "52.215.19.20",
                "doc_count": 141
              },
              {
                "key": "54.246.215.154",
                "doc_count": 141
              },
              {
                "key": "18.203.245.152",
                "doc_count": 140
              },
              {
                "key": "3.250.100.238",
                "doc_count": 140
              },
              {
                "key": "3.250.61.189",
                "doc_count": 140
              },
              {
                "key": "3.253.232.201",
                "doc_count": 140
              },
              {
                "key": "34.243.102.231",
                "doc_count": 140
              },
              {
                "key": "34.244.51.112",
                "doc_count": 140
              },
              {
                "key": "34.245.126.105",
                "doc_count": 140
              },
              {
                "key": "108.129.250.250",
                "doc_count": 139
              },
              {
                "key": "108.129.70.207",
                "doc_count": 139
              },
              {
                "key": "18.201.71.148",
                "doc_count": 139
              },
              {
                "key": "3.255.105.144",
                "doc_count": 139
              },
              {
                "key": "54.195.156.159",
                "doc_count": 139
              },
              {
                "key": "54.216.149.40",
                "doc_count": 139
              },
              {
                "key": "108.129.200.76",
                "doc_count": 138
              },
              {
                "key": "108.130.66.129",
                "doc_count": 138
              },
              {
                "key": "3.252.69.94",
                "doc_count": 138
              },
              {
                "key": "3.255.85.8",
                "doc_count": 138
              },
              {
                "key": "54.154.208.119",
                "doc_count": 138
              },
              {
                "key": "54.170.24.56",
                "doc_count": 138
              },
              {
                "key": "34.244.95.51",
                "doc_count": 137
              },
              {
                "key": "52.214.31.64",
                "doc_count": 137
              },
              {
                "key": "54.194.192.169",
                "doc_count": 137
              },
              {
                "key": "54.247.3.92",
                "doc_count": 137
              },
              {
                "key": "54.74.143.22",
                "doc_count": 137
              },
              {
                "key": "18.201.255.175",
                "doc_count": 136
              },
              {
                "key": "3.250.10.245",
                "doc_count": 136
              },
              {
                "key": "34.240.200.218",
                "doc_count": 136
              },
              {
                "key": "54.194.114.116",
                "doc_count": 136
              },
              {
                "key": "108.130.94.135",
                "doc_count": 135
              },
              {
                "key": "3.248.227.171",
                "doc_count": 135
              },
              {
                "key": "3.249.229.238",
                "doc_count": 135
              },
              {
                "key": "3.250.133.102",
                "doc_count": 135
              },
              {
                "key": "3.250.186.244",
                "doc_count": 135
              },
              {
                "key": "3.252.101.56",
                "doc_count": 135
              },
              {
                "key": "3.254.207.171",
                "doc_count": 135
              },
              {
                "key": "34.242.94.15",
                "doc_count": 135
              },
              {
                "key": "52.16.33.172",
                "doc_count": 135
              },
              {
                "key": "54.217.9.11",
                "doc_count": 135
              },
              {
                "key": "108.130.20.227",
                "doc_count": 134
              },
              {
                "key": "3.249.134.184",
                "doc_count": 134
              },
              {
                "key": "34.240.211.72",
                "doc_count": 134
              },
              {
                "key": "34.248.209.42",
                "doc_count": 134
              },
              {
                "key": "34.254.162.68",
                "doc_count": 134
              },
              {
                "key": "34.254.96.96",
                "doc_count": 134
              },
              {
                "key": "3.248.215.132",
                "doc_count": 133
              },
              {
                "key": "3.250.86.241",
                "doc_count": 133
              },
              {
                "key": "3.253.78.83",
                "doc_count": 133
              },
              {
                "key": "3.255.195.14",
                "doc_count": 133
              },
              {
                "key": "34.245.217.59",
                "doc_count": 133
              },
              {
                "key": "54.78.193.87",
                "doc_count": 133
              },
              {
                "key": "34.250.171.203",
                "doc_count": 132
              },
              {
                "key": "34.250.175.37",
                "doc_count": 132
              },
              {
                "key": "54.154.151.231",
                "doc_count": 132
              },
              {
                "key": "54.217.180.59",
                "doc_count": 132
              },
              {
                "key": "54.74.27.133",
                "doc_count": 132
              },
              {
                "key": "176.34.170.64",
                "doc_count": 131
              },
              {
                "key": "18.201.221.108",
                "doc_count": 131
              },
              {
                "key": "3.248.221.118",
                "doc_count": 131
              },
              {
                "key": "3.252.27.159",
                "doc_count": 131
              },
              {
                "key": "34.241.151.217",
                "doc_count": 131
              },
              {
                "key": "34.244.99.218",
                "doc_count": 131
              },
              {
                "key": "34.247.162.254",
                "doc_count": 131
              },
              {
                "key": "34.254.244.213",
                "doc_count": 131
              },
              {
                "key": "52.209.234.223",
                "doc_count": 131
              },
              {
                "key": "54.220.116.95",
                "doc_count": 131
              },
              {
                "key": "108.130.13.88",
                "doc_count": 130
              },
              {
                "key": "18.201.140.11",
                "doc_count": 130
              },
              {
                "key": "34.244.153.214",
                "doc_count": 130
              },
              {
                "key": "54.246.57.115",
                "doc_count": 130
              },
              {
                "key": "3.250.154.160",
                "doc_count": 129
              },
              {
                "key": "34.240.197.21",
                "doc_count": 129
              },
              {
                "key": "46.137.5.99",
                "doc_count": 129
              },
              {
                "key": "108.130.87.219",
                "doc_count": 128
              },
              {
                "key": "18.202.225.99",
                "doc_count": 128
              },
              {
                "key": "34.240.235.51",
                "doc_count": 128
              },
              {
                "key": "34.248.177.104",
                "doc_count": 128
              },
              {
                "key": "34.250.208.192",
                "doc_count": 128
              },
              {
                "key": "52.215.15.131",
                "doc_count": 128
              },
              {
                "key": "54.77.87.253",
                "doc_count": 128
              },
              {
                "key": "54.78.88.42",
                "doc_count": 128
              },
              {
                "key": "108.129.72.90",
                "doc_count": 127
              },
              {
                "key": "108.130.14.65",
                "doc_count": 127
              },
              {
                "key": "18.201.154.50",
                "doc_count": 127
              },
              {
                "key": "3.252.227.164",
                "doc_count": 127
              },
              {
                "key": "34.242.101.193",
                "doc_count": 127
              },
              {
                "key": "34.254.89.220",
                "doc_count": 127
              },
              {
                "key": "52.213.158.115",
                "doc_count": 127
              },
              {
                "key": "3.250.14.208",
                "doc_count": 126
              },
              {
                "key": "3.254.190.191",
                "doc_count": 126
              },
              {
                "key": "34.241.102.203",
                "doc_count": 126
              },
              {
                "key": "54.171.249.146",
                "doc_count": 126
              },
              {
                "key": "54.216.246.226",
                "doc_count": 126
              },
              {
                "key": "18.200.244.107",
                "doc_count": 125
              },
              {
                "key": "3.248.195.183",
                "doc_count": 125
              },
              {
                "key": "3.253.98.250",
                "doc_count": 125
              },
              {
                "key": "34.254.246.10",
                "doc_count": 125
              },
              {
                "key": "54.229.203.103",
                "doc_count": 125
              },
              {
                "key": "63.35.169.141",
                "doc_count": 125
              },
              {
                "key": "3.250.89.129",
                "doc_count": 124
              },
              {
                "key": "3.253.45.116",
                "doc_count": 124
              },
              {
                "key": "34.244.124.222",
                "doc_count": 124
              },
              {
                "key": "34.249.156.248",
                "doc_count": 124
              },
              {
                "key": "52.18.2.54",
                "doc_count": 124
              },
              {
                "key": "52.51.38.134",
                "doc_count": 124
              },
              {
                "key": "54.155.115.245",
                "doc_count": 124
              },
              {
                "key": "54.74.66.36",
                "doc_count": 124
              },
              {
                "key": "108.129.162.112",
                "doc_count": 123
              },
              {
                "key": "3.251.180.44",
                "doc_count": 123
              },
              {
                "key": "3.253.2.208",
                "doc_count": 123
              },
              {
                "key": "34.240.8.102",
                "doc_count": 123
              },
              {
                "key": "34.240.97.251",
                "doc_count": 123
              },
              {
                "key": "34.251.226.134",
                "doc_count": 123
              },
              {
                "key": "34.252.197.20",
                "doc_count": 123
              },
              {
                "key": "52.214.129.63",
                "doc_count": 123
              },
              {
                "key": "52.50.158.238",
                "doc_count": 123
              },
              {
                "key": "54.154.194.55",
                "doc_count": 123
              },
              {
                "key": "108.129.244.51",
                "doc_count": 122
              },
              {
                "key": "18.201.146.158",
                "doc_count": 122
              },
              {
                "key": "34.242.222.218",
                "doc_count": 122
              },
              {
                "key": "34.244.134.73",
                "doc_count": 122
              },
              {
                "key": "34.244.168.34",
                "doc_count": 122
              },
              {
                "key": "34.251.46.22",
                "doc_count": 122
              },
              {
                "key": "52.211.79.143",
                "doc_count": 122
              },
              {
                "key": "52.19.235.159",
                "doc_count": 121
              },
              {
                "key": "3.252.230.237",
                "doc_count": 120
              },
              {
                "key": "34.246.191.228",
                "doc_count": 120
              },
              {
                "key": "52.18.218.180",
                "doc_count": 120
              },
              {
                "key": "18.202.251.210",
                "doc_count": 119
              },
              {
                "key": "3.249.205.242",
                "doc_count": 119
              },
              {
                "key": "3.251.175.56",
                "doc_count": 119
              },
              {
                "key": "3.251.226.226",
                "doc_count": 119
              },
              {
                "key": "3.251.253.98",
                "doc_count": 119
              },
              {
                "key": "3.252.60.54",
                "doc_count": 119
              },
              {
                "key": "3.253.36.169",
                "doc_count": 119
              },
              {
                "key": "34.244.105.4",
                "doc_count": 119
              },
              {
                "key": "34.245.125.14",
                "doc_count": 119
              },
              {
                "key": "52.17.222.138",
                "doc_count": 119
              },
              {
                "key": "52.49.96.54",
                "doc_count": 119
              },
              {
                "key": "18.201.199.250",
                "doc_count": 118
              },
              {
                "key": "3.252.127.225",
                "doc_count": 118
              },
              {
                "key": "34.243.97.254",
                "doc_count": 118
              },
              {
                "key": "34.251.191.65",
                "doc_count": 118
              },
              {
                "key": "52.51.164.22",
                "doc_count": 118
              },
              {
                "key": "54.155.47.136",
                "doc_count": 118
              },
              {
                "key": "54.171.138.191",
                "doc_count": 118
              },
              {
                "key": "54.78.34.232",
                "doc_count": 118
              },
              {
                "key": "108.130.36.85",
                "doc_count": 117
              },
              {
                "key": "3.249.143.39",
                "doc_count": 117
              },
              {
                "key": "34.244.193.138",
                "doc_count": 117
              },
              {
                "key": "52.31.196.217",
                "doc_count": 117
              },
              {
                "key": "176.34.213.95",
                "doc_count": 116
              },
              {
                "key": "3.252.194.253",
                "doc_count": 116
              },
              {
                "key": "3.254.174.111",
                "doc_count": 116
              },
              {
                "key": "34.255.178.173",
                "doc_count": 116
              },
              {
                "key": "52.215.204.250",
                "doc_count": 116
              },
              {
                "key": "52.49.142.198",
                "doc_count": 115
              },
              {
                "key": "54.78.20.214",
                "doc_count": 113
              },
              {
                "key": "63.35.220.23",
                "doc_count": 110
              },
              {
                "key": "34.240.98.106",
                "doc_count": 99
              },
              {
                "key": "3.251.233.138",
                "doc_count": 95
              },
              {
                "key": "54.74.65.198",
                "doc_count": 92
              },
              {
                "key": "54.72.226.32",
                "doc_count": 90
              },
              {
                "key": "54.217.31.51",
                "doc_count": 89
              },
              {
                "key": "52.16.47.100",
                "doc_count": 88
              },
              {
                "key": "3.249.37.208",
                "doc_count": 85
              },
              {
                "key": "18.202.225.41",
                "doc_count": 79
              },
              {
                "key": "34.245.11.60",
                "doc_count": 79
              },
              {
                "key": "54.194.122.114",
                "doc_count": 77
              },
              {
                "key": "34.248.197.62",
                "doc_count": 72
              },
              {
                "key": "3.253.107.55",
                "doc_count": 67
              },
              {
                "key": "3.255.86.246",
                "doc_count": 55
              },
              {
                "key": "3.255.59.210",
                "doc_count": 54
              },
              {
                "key": "34.244.121.52",
                "doc_count": 53
              },
              {
                "key": "18.203.69.157",
                "doc_count": 49
              },
              {
                "key": "54.78.120.181",
                "doc_count": 47
              },
              {
                "key": "3.253.251.69",
                "doc_count": 42
              },
              {
                "key": "54.246.151.173",
                "doc_count": 42
              },
              {
                "key": "3.252.241.150",
                "doc_count": 40
              },
              {
                "key": "34.244.42.215",
                "doc_count": 39
              },
              {
                "key": "34.245.184.149",
                "doc_count": 39
              },
              {
                "key": "3.248.200.249",
                "doc_count": 29
              },
              {
                "key": "3.254.125.245",
                "doc_count": 28
              },
              {
                "key": "34.247.183.130",
                "doc_count": 25
              },
              {
                "key": "52.212.136.192",
                "doc_count": 24
              },
              {
                "key": "54.170.65.156",
                "doc_count": 24
              },
              {
                "key": "3.249.180.178",
                "doc_count": 19
              },
              {
                "key": "108.130.62.34",
                "doc_count": 16
              },
              {
                "key": "18.203.221.59",
                "doc_count": 15
              },
              {
                "key": "34.243.76.206",
                "doc_count": 15
              },
              {
                "key": "54.194.8.150",
                "doc_count": 11
              },
              {
                "key": "34.245.55.106",
                "doc_count": 10
              },
              {
                "key": "54.75.14.53",
                "doc_count": 10
              },
              {
                "key": "34.242.182.51",
                "doc_count": 9
              },
              {
                "key": "63.32.94.206",
                "doc_count": 9
              },
              {
                "key": "3.250.174.188",
                "doc_count": 8
              },
              {
                "key": "52.210.82.219",
                "doc_count": 7
              },
              {
                "key": "3.254.143.90",
                "doc_count": 6
              },
              {
                "key": "34.252.185.66",
                "doc_count": 6
              },
              {
                "key": "3.249.74.36",
                "doc_count": 2
              },
              {
                "key": "3.252.0.128",
                "doc_count": 2
              }
            ]
          }
        },
        {
          "key": "/stage/api/{id1}/orders/{id2}/references",
          "doc_count": {
            "value": 12987
          },
          "max_ts": {
            "value": 1751530764785,
            "value_as_string": "2025-07-03T08:19:24.785Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "57.128.35.69",
                "doc_count": 7053
              },
              {
                "key": "34.246.101.28",
                "doc_count": 5934
              }
            ]
          }
        },
        {
          "key": "/stage/api/public/quotes/complete/selling",
          "doc_count": {
            "value": 3177
          },
          "max_ts": {
            "value": 1751530712966,
            "value_as_string": "2025-07-03T08:18:32.966Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "54.239.113.195",
                "doc_count": 191
              },
              {
                "key": "54.239.113.235",
                "doc_count": 189
              },
              {
                "key": "54.239.113.198",
                "doc_count": 188
              },
              {
                "key": "54.239.113.234",
                "doc_count": 187
              },
              {
                "key": "54.239.113.150",
                "doc_count": 179
              },
              {
                "key": "54.239.113.149",
                "doc_count": 177
              },
              {
                "key": "54.239.113.194",
                "doc_count": 176
              },
              {
                "key": "54.239.113.233",
                "doc_count": 172
              },
              {
                "key": "54.239.113.240",
                "doc_count": 167
              },
              {
                "key": "54.239.113.236",
                "doc_count": 165
              },
              {
                "key": "54.239.113.142",
                "doc_count": 164
              },
              {
                "key": "54.239.113.237",
                "doc_count": 157
              },
              {
                "key": "54.239.113.145",
                "doc_count": 147
              },
              {
                "key": "54.239.113.241",
                "doc_count": 140
              },
              {
                "key": "54.239.113.197",
                "doc_count": 139
              },
              {
                "key": "54.239.113.243",
                "doc_count": 137
              },
              {
                "key": "54.239.113.242",
                "doc_count": 133
              },
              {
                "key": "54.239.113.239",
                "doc_count": 130
              },
              {
                "key": "54.239.113.148",
                "doc_count": 129
              },
              {
                "key": "54.239.113.151",
                "doc_count": 110
              }
            ]
          }
        },
        {
          "key": "/stage/api/{id1}/quotes/vehicle-types",
          "doc_count": {
            "value": 290
          },
          "max_ts": {
            "value": 1751530272592,
            "value_as_string": "2025-07-03T08:11:12.592Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "34.246.101.28",
                "doc_count": 290
              }
            ]
          }
        },
        {
          "key": "/stage/api/public/quotes/email/{id1}",
          "doc_count": {
            "value": 55
          },
          "max_ts": {
            "value": 1751527036438,
            "value_as_string": "2025-07-03T07:17:16.438Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "163.62.112.195",
                "doc_count": 17
              },
              {
                "key": "147.161.230.121",
                "doc_count": 2
              },
              {
                "key": "163.62.112.225",
                "doc_count": 2
              },
              {
                "key": "84.246.149.34",
                "doc_count": 2
              },
              {
                "key": "108.143.117.185",
                "doc_count": 1
              },
              {
                "key": "130.41.157.77",
                "doc_count": 1
              },
              {
                "key": "147.161.152.179",
                "doc_count": 1
              },
              {
                "key": "147.161.181.117",
                "doc_count": 1
              },
              {
                "key": "147.161.184.175",
                "doc_count": 1
              },
              {
                "key": "147.161.185.101",
                "doc_count": 1
              },
              {
                "key": "147.161.230.103",
                "doc_count": 1
              },
              {
                "key": "147.161.230.110",
                "doc_count": 1
              },
              {
                "key": "147.161.230.118",
                "doc_count": 1
              },
              {
                "key": "147.161.232.87",
                "doc_count": 1
              },
              {
                "key": "155.190.38.4",
                "doc_count": 1
              },
              {
                "key": "156.67.189.194",
                "doc_count": 1
              },
              {
                "key": "163.62.112.105",
                "doc_count": 1
              },
              {
                "key": "163.62.112.45",
                "doc_count": 1
              },
              {
                "key": "170.85.0.192",
                "doc_count": 1
              },
              {
                "key": "170.85.0.88",
                "doc_count": 1
              },
              {
                "key": "194.9.99.2",
                "doc_count": 1
              },
              {
                "key": "212.78.194.44",
                "doc_count": 1
              },
              {
                "key": "213.56.167.177",
                "doc_count": 1
              },
              {
                "key": "217.109.81.69",
                "doc_count": 1
              },
              {
                "key": "31.156.17.189",
                "doc_count": 1
              },
              {
                "key": "37.71.193.202",
                "doc_count": 1
              },
              {
                "key": "45.80.20.255",
                "doc_count": 1
              },
              {
                "key": "77.158.70.34",
                "doc_count": 1
              },
              {
                "key": "80.147.227.20",
                "doc_count": 1
              },
              {
                "key": "80.15.6.82",
                "doc_count": 1
              },
              {
                "key": "80.17.152.3",
                "doc_count": 1
              },
              {
                "key": "80.58.137.194",
                "doc_count": 1
              },
              {
                "key": "81.173.206.34",
                "doc_count": 1
              },
              {
                "key": "87.128.169.66",
                "doc_count": 1
              },
              {
                "key": "88.30.35.134",
                "doc_count": 1
              },
              {
                "key": "90.85.251.66",
                "doc_count": 1
              }
            ]
          }
        },
        {
          "key": "/stage/api/public/notify/agency",
          "doc_count": {
            "value": 1
          },
          "max_ts": {
            "value": 1751479736141,
            "value_as_string": "2025-07-02T18:08:56.141Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "3.255.10.182",
                "doc_count": 1
              }
            ]
          }
        },
        {
          "key": "/stage/api/v2/{id1}/quotes/request",
          "doc_count": {
            "value": 276
          },
          "max_ts": {
            "value": 1751463480781,
            "value_as_string": "2025-07-02T13:38:00.781Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "141.95.109.227",
                "doc_count": 155
              },
              {
                "key": "149.202.190.80",
                "doc_count": 78
              },
              {
                "key": "3.255.10.182",
                "doc_count": 43
              }
            ]
          }
        },
        {
          "key": "/stage/api/{id1}/sendmail",
          "doc_count": {
            "value": 16
          },
          "max_ts": {
            "value": 1751289709500,
            "value_as_string": "2025-06-30T13:21:49.500Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "92.175.113.165",
                "doc_count": 5
              },
              {
                "key": "45.80.20.255",
                "doc_count": 2
              },
              {
                "key": "80.169.137.22",
                "doc_count": 2
              },
              {
                "key": "91.189.227.58",
                "doc_count": 2
              },
              {
                "key": "147.161.181.117",
                "doc_count": 1
              },
              {
                "key": "147.161.184.82",
                "doc_count": 1
              },
              {
                "key": "165.225.20.228",
                "doc_count": 1
              },
              {
                "key": "84.246.149.34",
                "doc_count": 1
              },
              {
                "key": "86.245.172.47",
                "doc_count": 1
              }
            ]
          }
        },
        {
          "key": "/stage/api/{id1}/quotes/{id2}/cancel",
          "doc_count": {
            "value": 8301
          },
          "max_ts": {
            "value": 1750343898785,
            "value_as_string": "2025-06-19T14:38:18.785Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "149.202.190.80",
                "doc_count": 4831
              },
              {
                "key": "141.95.109.227",
                "doc_count": 3470
              }
            ]
          }
        },
        {
          "key": "/stage/api/v2/{id1}/order",
          "doc_count": {
            "value": 218
          },
          "max_ts": {
            "value": 1750343720033,
            "value_as_string": "2025-06-19T14:35:20.033Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "141.95.109.227",
                "doc_count": 141
              },
              {
                "key": "149.202.190.80",
                "doc_count": 77
              }
            ]
          }
        }
      ];


async function transform() {       
    console.log('|path| client_ip | nrCalls since(20 jun 2025) from this ip|');
    console.log('|--|--|--|');
    for (const esItem of esData) {
        const { key, unique_client_ips } = esItem;
        console.log(`|${esItem.key}||total: ${esItem.doc_count.value}|`);
        for (const clientItem of unique_client_ips.buckets) {
            try {
                const hostname = await dns.reverse(clientItem.key);
                const firstHost = hostname[0];
                console.log(`||${firstHost}|${clientItem.doc_count}|`)
            } catch( err ) {
                console.log(`||${clientItem.key}|${clientItem.doc_count}|`)
            }
        }
    }
}


transform();


  /*

         "key": "/stage/api/healthcheck",
          "doc_count": {
            "value": 78535
          },
          "max_ts": {
            "value": 1751530776318,
            "value_as_string": "2025-07-03T08:19:36.318Z"
          },
          "unique_client_ips": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "key": "149.202.160.40",
                "doc_count": 26240
              },
              
              

| path                                      | nrCalls since(20 jun 2025) | last call made           |
| ----------------------------------------- | -------------------------- | ------------------------ |
| /stage/api/:shipper_id/favourites/address/:search | 
| /stage/api/{id1}/orders/{id2}/references  | 9051                       | 2025-07-02T15:40:20.548Z |
| /stage/api/public/quotes/complete/selling | 2209                       | 2025-07-02T15:37:39.619Z |
| /stage/api/{id1}/quotes/vehicle-types     | 184                        | 2025-07-02T14:31:35.097Z |
| /stage/api/v2/{id1}/quotes/request        | 29                         | 2025-07-02T13:38:00.781Z |
| /stage/api/public/quotes/email/{id1}      | 49                         | 2025-07-02T11:40:25.594Z |
| /stage/api/{id1}/sendmail                 | 10                         | 2025-06-30T13:21:49.500Z |
*/