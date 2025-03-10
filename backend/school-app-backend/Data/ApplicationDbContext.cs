using Microsoft.EntityFrameworkCore;
using school_app_backend.Features.DbRelationships;
using school_app_backend.Features.Students;
using school_app_backend.Features.Tutors;
using System;

namespace school_app_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Tutor> Tutors { get; set; }
        public DbSet<StudentTutor> StudentsTutors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>().HasQueryFilter(s => !s.IsDeleted);
            modelBuilder.Entity<Tutor>().HasQueryFilter(s => !s.IsDeleted);

        }

    }
}
