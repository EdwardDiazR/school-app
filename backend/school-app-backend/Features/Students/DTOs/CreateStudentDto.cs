namespace school_app_backend.Features.Students.DTOs;

public record CreateStudentDto(
    string FirstName,
    string? MiddleName,
    string LastName,
    string SecondLastName,
    char Gender,
    DateTime Dob,
    string ? Address,
    string ? Email,
    string ?Phone,
    int ActualGrade
    );