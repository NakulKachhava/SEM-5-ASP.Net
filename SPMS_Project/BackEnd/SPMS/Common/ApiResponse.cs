namespace SPMS.Common
{
    public class ApiResponse<T>
    {
        // Indicates whether request was successful
        public bool Success { get; set; }

        // Success or failure message
        public string Message { get; set; } = string.Empty;

        // Actual response data
        public T? Data { get; set; }

        // Validation or error messages
        public List<string>? Errors { get; set; }
    }

    public class PaginatedResponse<T>
    {
        public List<T> Items { get; set; } = new();

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int TotalRecords { get; set; }

        public int TotalPages { get; set; }
    }
    
}
