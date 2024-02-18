/** Construct a redirect response */
export function redirect(location: string): Response {
    return new Response(null, {
      headers: {
        location,
      },
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
      status: 302,
    });
  }
  
  /** Construct an unauthorized response */
  export function unauthorized(error?: string): Response {
    return new Response(error ?? null, {
      status: 401,
    });
  }
  
  /** Construct an 400 bad request response */
  export function bad(error?: string): Response {
    return new Response(error ?? null, {
      status: 400,
    });
  }
  
  /** Construct a success response */
  export function success(message?: string): Response {
    return new Response(message ?? null);
  }
  