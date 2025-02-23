namespace school_app_backend.Features.Students;

public class Student
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public char Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public int TutorQuantity { get; set; }
    public int ActualGrade { get; set; }
    public bool IsDeleted { get; set; }
    public bool IsActive { get; set; }


}