use aes::Aes128;
use block_modes::block_padding::Pkcs7;
use block_modes::{BlockMode, Cbc};
use now_lambda::{error::NowError, lambda, IntoResponse, Request};
use std::{env, error::Error};
use hex::FromHex;

mod constants;
mod util;

// create an alias for convenience
type Aes128Cbc = Cbc<Aes128, Pkcs7>;

struct EncryptedData {
  credentials: String,
  service_jwk: String,
  analytics_jwk: String,
}

// This handler is used for local development to regenerate the constants
fn handler(request: Request) -> Result<impl IntoResponse, NowError> {
  let credentials = read_env("FIREBASE_CREDENTIALS");
  let service_jwk = read_env("FIREBASE_JWK_SERVICE_ACCT");
  let analytics_jwk = read_env("FIREBASE_JWK_ANALYTICS_ACCT");

  let data = match request.uri().query() {
    Some(_) => EncryptedData {
      credentials: util::decrypt_string(constants::FIREBASE_CREDENTIALS),
      service_jwk: util::decrypt_string(constants::FIREBASE_SERVICE_JWK),
      analytics_jwk: util::decrypt_string(constants::FIREBASE_ANALYTICS_JWK),
    },
    None => EncryptedData {
      credentials: encrypt_string(&credentials),
      service_jwk: encrypt_string(&service_jwk),
      analytics_jwk: encrypt_string(&analytics_jwk),
    },
  };

  Ok(format!(
    "<p>credentials</p><pre>{}</pre><p>service_jwk</p><pre>{}</pre><p>analytics_jwk</p><pre>{}</pre>",
    data.credentials, data.service_jwk, data.analytics_jwk
  ))
}

fn encrypt_string(text: &str) -> String {
  let key = Vec::from_hex(env::var("AES_KEY").unwrap()).expect("Invalid hex string");
  let iv = Vec::from_hex(env::var("AES_IV").unwrap()).expect("Invalid hex string");

  let cipher = Aes128Cbc::new_var(&key, &iv).unwrap();
  let ciphertext = cipher.encrypt_vec(text.as_bytes());

  String::from_utf8(
    ciphertext
      .to_vec()
      .iter()
      .map(|b| std::ascii::escape_default(*b))
      .flatten()
      .collect(),
  )
  .unwrap()
}

fn read_env(key: &str) -> String {
  let base64_key = env::var(key).expect("Read string from env");

  String::from_utf8(base64::decode(&base64_key).unwrap()).unwrap()
}

fn main() -> Result<(), Box<dyn Error>> {
  Ok(lambda!(handler))
}
