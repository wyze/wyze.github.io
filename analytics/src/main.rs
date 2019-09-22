use http::{StatusCode, header};
use now_lambda::{IntoResponse, Request, Response, error::NowError, lambda};
use std::error::Error;

fn handler(request: Request) -> Result<impl IntoResponse, NowError> {
    let uri = request.uri();
    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/html")
        .body(format!("You made a request to the following url: {}", uri))
        .expect("Failed to render response");

    Ok(response);
}

fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler));
}
