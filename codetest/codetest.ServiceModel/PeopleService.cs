using codetest.ServiceModel.Types;
using ServiceStack;

namespace codetest.ServiceModel
{
    // endpoint for getting everyone
    [Route("/people/all", "GET")]
    public class People : IReturn<Person[]> { }

    // endpoint for creating a new person
    [Route("/person/create", "POST")]
    public class CreatePerson : IReturn<Person>
    {
        public Person person { get; set; }
    }

    // endpoint for deleting a person
    [Route("/person/delete/{id}", "DELETE")]
    public class DeletePerson : IReturn<int>
    {
        public int id { get; set; }
    }
}
