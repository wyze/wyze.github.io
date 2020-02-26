use aes::Aes128;
use block_modes::block_padding::Pkcs7;
use block_modes::{BlockMode, Cbc};
use hex::FromHex;
use std::env;

// create an alias for convenience
type Aes128Cbc = Cbc<Aes128, Pkcs7>;

pub fn decrypt_string(text: &[u8]) -> String {
  let key = Vec::from_hex(env::var("AES_KEY").unwrap()).expect("Invalid hex string");
  let iv = Vec::from_hex(env::var("AES_IV").unwrap()).expect("Invalid hex string");

  let cipher = Aes128Cbc::new_var(&key, &iv).unwrap();
  let mut buf = text.to_vec();
  let decrypted_ciphertext = cipher.decrypt(&mut buf).unwrap();
  let decrypted = String::from_utf8_lossy(&decrypted_ciphertext);

  decrypted.into_owned()
}
