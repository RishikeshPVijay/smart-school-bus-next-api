import { ServiceAccount } from "firebase-admin";

export const firebaseConfig = {
  type: "service_account",
  project_id: "smart-school-bus-c2ba1",
  private_key_id: "5f949e5a2d9a027098513da2eb4ae8a37eedb016",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCux880pML/8OTs\nreNzwlcZsj0x5boRiPyKqPpc3T4TrfbBTcWFKLUGLwDedApH/H5x0psLrihJ61m5\nU2k7qfzAexgK15U87blFkRF7ZwYTh4DC5vRhNg6//lvXt9/0wuIdsvxQLkJS2BFp\nnwgilNOr9RLuhrJMAPRnDESRcsdnCbG6VQDixMnwkwgfEO14b7LsBwfMaz+XMLXV\n3wESGNB9QDevU9aMRGHfmb9G3cLPaLp11L3T81DiaTca5bHnGoaoFSw/utwCMXRM\nSSxcBnI+XO9xieNsirMTtTfS3Q/zH+7wVta/vFsQv3UCk6wEOIVG1xNW59Uyp+Dt\nbVY8NDSNAgMBAAECggEASH/nio3BuYsCWs7yp4T4vlb6HWWOnlF1eEsJt1Wqt10V\nGzAYe9jb5lm/AYee8Cdjh/F1kQ3H9omiqUZZQ3+KsYkd+vlcFW8CyEGZv9eHZLhz\nh+Vnf5991NQ84qmKQ6xHQUyKbvQRXO31oxtts3KKryy0kq7a7L4Eo24qTy8OWcWz\nLRlBpDUeJxbcVJvSwLtT732jmIvjOG8ryH/gUKbx5ls9wOB+f3bULPuVeWKqmP/P\nKt9OoUm7b8SOi58oFBhXRqBPnhzz2ynM48KwG/wFefpTTh0hCWyVSwGD+vwAFTYX\nbKtWKFlVU7udr9H+pW0bS+j5PjTxNFW5L6ke5mkb/QKBgQDV0TzRPWu3bIsIt/EB\nKDZaZMlQNZxZj7pZc7ANVQCS33HDMx593ywm1m8TlC4A39LmOX+U+yy/JYP7Ey/P\nZiKJI2Lhlk6YvY5II5rQ+hGajn9b0DyX0ZGW/NyxHsP5bP/hVJQ4K+fwb6yd9Mmf\nhQLeJ4A2CRuT8oi+VnmiXSCihwKBgQDRQwgh9Wwvc71iFo+pTA0xXWfRzd1WQeZ6\nJOt9orcguO0Mt/dQOFl77gnnoLe5drllNAz5TetRHS8UTsYOeBzh6HuAYa3ckNB8\nhJg1ohWs1JWIxxG7TdoOJYdVU2BpUNoR25TJ6tGpECDZOZ5n/14Go3KAdd2DJdIb\n4ZQWQ6FxSwKBgQCDiTXtzug+LeMWWPpFaPSPBWOnGWP24OmV8AqFGR7CO/2jRQZk\nDu/9cHtiwwzN8uOuR/8Jqr9rU+vugG4wG7fxP7ir6KivZCVskaLDHqPHvhPxaphs\nGTuEdEhcGf4bqod7mmmYaMJF8p1xis6ieNQ70HcaRt4VVOX0mgQ38yyJbwKBgQDF\nxfeCuMQVmOqNMMt38tOpKyE67bjZlBDyscALDmTLPVt0oM3ReGBCO3gK/R+G3klb\n97SnTlgvYkijhcuz0xtg+ur2K9s40XjpphuA3P5lSMlG6vW8M1j588gTAWjmQC7J\nn+DgcNjUUtTo2Ib4vSYtWf6WoE7Ja05HYYwm+qYzPwKBgF3cppn0xlJCf4ZfE8lf\nq+P9uYCTepd9cussaUcLCYBv4Rnt9RthkKU66oT/S3bkK+TQpSHAYTsboP6B2LlQ\nZkI7FY25cp8NoPekNIQiQO2jTEk5lceQAHEDAD2Re2GRQZ1WowsCLl7TPWfiwmZe\n9VRGKYP8Iz7uSIV9hwIPZ0uc\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-j48w8@smart-school-bus-c2ba1.iam.gserviceaccount.com",
  client_id: "114438226008517261121",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j48w8%40smart-school-bus-c2ba1.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
} as const;
