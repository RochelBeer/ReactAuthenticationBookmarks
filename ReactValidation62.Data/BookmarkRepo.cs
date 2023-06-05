using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactValidation62.Data
{
    public class BookmarkRepo
    {
        private readonly string _connectionString;
        public BookmarkRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new ValidationDBContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }
        public void Delete(Bookmark bookmark)
        {
            using var context = new ValidationDBContext(_connectionString);
            context.Bookmarks.Remove(bookmark);
            context.SaveChanges();
        }
        public void Edit(Bookmark bookmark)
        {
            using var context = new ValidationDBContext(_connectionString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();

        }
        public List<Bookmark> GetBookmarks(int id)
        {
            using var context = new ValidationDBContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public List<Link> GetTop5Bookmarks()
        {
            using var context = new ValidationDBContext(_connectionString);
            var result = context.Bookmarks
     .GroupBy(b => b.Url)
     .Select(row => new Link { Url = row.Key, UrlCount = row.Count() })
     .OrderByDescending(row => row.UrlCount)
    .Take(5)
    .ToList();
            return result;
        }
    }
}

