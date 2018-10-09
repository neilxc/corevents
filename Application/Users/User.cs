namespace Application.Users
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string Token { get; set; }
    }

    public class UserEnvelope
    {
        public UserEnvelope(User user)
        {
            User = user;
        }

        public User User { get; set; }
    }
}