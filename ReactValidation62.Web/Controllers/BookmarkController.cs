using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactValidation62.Data;

namespace ReactValidation62.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Authorize]
        [HttpPost]
        [Route("addbookmark")]        
        public void AddBookmark(Bookmark bookmark)
        {
            Repository repo = new(_connectionString);
            var currentUser = repo.GetByEmail(User.Identity.Name);
            BookmarkRepo bookmarkRepo = new(_connectionString);
            bookmark.UserId = currentUser.Id;
            bookmarkRepo.AddBookmark(bookmark);
        }
        [Route("GetBookmarksForCurrentUser")]
        public List<Bookmark> GetBookmarksForCurrentUser()
        {
            Repository repo = new(_connectionString);
            var currentUser = repo.GetByEmail(User.Identity.Name);
            BookmarkRepo bookmarkRepo = new(_connectionString);
            return bookmarkRepo.GetBookmarks(currentUser.Id);
        }
        [Route("GetTop5Bookmarks")]
        public List<Link> GetTop5Bookmarks()
        {
            BookmarkRepo repo = new(_connectionString);
            return repo.GetTop5Bookmarks();
        }
        [Authorize]
        [HttpPost]
        [Route("delete")]
        public void Delete(Bookmark bookmark)
        {
            Repository repo = new(_connectionString);
            var currentUser = repo.GetByEmail(User.Identity.Name);
            BookmarkRepo bookmarkRepo = new(_connectionString);
            bookmarkRepo.Delete(bookmark);
        }
        [Authorize]
        [HttpPost]
        [Route("edit")]
        public void Edit(Bookmark bookmark)
        {
            BookmarkRepo repo = new(_connectionString);
            repo.Edit(bookmark);
        }
    }
}
