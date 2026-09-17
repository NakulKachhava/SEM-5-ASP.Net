using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPMS.Migrations
{
    /// <inheritdoc />
    public partial class AddedDocumentPath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaskPriortyCssClass",
                table: "SPM_TaskPriority",
                newName: "TaskPriorityCssClass");

            migrationBuilder.AddColumn<string>(
                name: "DocumentPath",
                table: "SPM_User",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentPath",
                table: "SPM_User");

            migrationBuilder.RenameColumn(
                name: "TaskPriorityCssClass",
                table: "SPM_TaskPriority",
                newName: "TaskPriortyCssClass");
        }
    }
}
