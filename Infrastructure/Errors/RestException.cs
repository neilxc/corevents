using System;
using System.Net;

namespace Infrastructure.Errors
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }

        private object Errors { get; }
        private HttpStatusCode Code { get; }
    }
}