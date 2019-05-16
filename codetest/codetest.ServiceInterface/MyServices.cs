using ServiceStack;
using ServiceStack.Script;
using ServiceStack.DataAnnotations;
using codetest.ServiceModel;
using codetest.ServiceModel.Types;
using ServiceStack.OrmLite;

namespace codetest.ServiceInterface
{
    public class MyServices : Service
    {
        // Get endpoint to return all people in the database
        public object Get(People request)
        {
            var people = Db.Select<Person>(p => true);
            return people;
        }

        // Delete endpoint to remove a person from the database
        public object Delete(DeletePerson request)
        {
            var delete = Db.DeleteById<Person>(request.id);
            return delete;
        }

        // Post endpoint to create and insert a new person into the database
        public object Post(CreatePerson request)
        {
            var person = Db.Insert<Person>(request.person);
            return person;
        }
    }
}
