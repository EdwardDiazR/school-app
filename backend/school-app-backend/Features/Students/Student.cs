using System.ComponentModel.DataAnnotations;

namespace school_app_backend.Features.Students;

public class Student
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public required string LastName { get; set; }
    public string? SecondLastName { get; set; }
    public required string FullName { get; set; }
    public string? Address { get; set; }
    
    [AllowedValues("M", "F")] 
    public required char Gender { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public int Age { get; set; }    
    [EmailAddress] 
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public required DateTime CreationDate { get; set; }
    public required DateTime LastUpdateDate { get; set; }
    public required int TutorQuantity { get; set; }
    public required int ActualGrade { get; set; }
    public required bool IsDeleted { get; set; } = false;
    public required bool IsActive { get; set; }
}