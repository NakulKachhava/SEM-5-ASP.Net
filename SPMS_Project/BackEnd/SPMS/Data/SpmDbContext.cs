using Microsoft.EntityFrameworkCore;
using SPMS.Models;
using System.Data;

namespace SPMS.Data
{
    public class SpmDbContext : DbContext
    {
        public SpmDbContext(DbContextOptions<SpmDbContext> options)
            : base(options)
        {
        }

        public DbSet<SPM_Role> Roles => Set<SPM_Role>();
        public DbSet<SPM_User> Users => Set<SPM_User>();
        public DbSet<SPM_UserRole> UserRoles => Set<SPM_UserRole>();
        public DbSet<SPM_UserType> UserTypes => Set<SPM_UserType>();
        public DbSet<SPM_ProjectAllocation> ProjectAllocations => Set<SPM_ProjectAllocation>();
        public DbSet<SPM_ProjectMaster> ProjectMasters => Set<SPM_ProjectMaster>();
        public DbSet<SPM_Task> Tasks => Set<SPM_Task>();
        public DbSet<SPM_TaskPriority> TaskPriorities => Set<SPM_TaskPriority>();
        public DbSet<SPM_TaskStatus> TaskStatuses => Set<SPM_TaskStatus>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SPM_UserRole>()
                .HasKey(ur => new { ur.UserID, ur.RoleID });

            modelBuilder.Entity<SPM_UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_User>()
                .HasOne(u => u.UserType)
                .WithMany(ut => ut.Users)
                .HasForeignKey(u => u.UserTypeID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_ProjectAllocation>()
                .HasOne(pa => pa.Student)
                .WithMany(u => u.StudentAllocations)
                .HasForeignKey(pa => pa.StudentID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_ProjectAllocation>()
                .HasOne(pa => pa.Faculty)
                .WithMany(u => u.FacultyAllocations)
                .HasForeignKey(pa => pa.FacultyID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_ProjectAllocation>()
                .HasOne(pa => pa.Project)
                .WithMany(p => p.Allocations)
                .HasForeignKey(pa => pa.ProjectID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_Task>()
                .HasOne(t => t.ProjectAllocation)
                .WithMany(pa => pa.Tasks)
                .HasForeignKey(t => t.ProjectAllocationID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_Task>()
                .HasOne(t => t.TaskStatus)
                .WithMany(ts => ts.Tasks)
                .HasForeignKey(t => t.TaskStatusID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SPM_Task>()
                .HasOne(t => t.TaskPriority)
                .WithMany(tp => tp.Tasks)
                .HasForeignKey(t => t.TaskPriorityID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
