## Heading 2

### Heading 3

- **list** 1
- list 2

## Code Examples

Here's some TypeScript code:

```typescript
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  console.log(`Hello, ${user.name}!`);
  return `Welcome, ${user.name}`;
}

const user: User = { name: 'World', age: 25 };
greet(user);
```

And some C# code:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var message = "Hello, World!";
        Console.WriteLine(message);
        
        var fibonacci = CalculateFibonacci(10);
        Console.WriteLine($"Fibonacci(10) = {fibonacci}");
    }
    
    private static int CalculateFibonacci(int n)
    {
        if (n <= 1) return n;
        return CalculateFibonacci(n - 1) + CalculateFibonacci(n - 2);
    }
}
```

Here's some CSS:

```css
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button:hover {
  background-color: #0056b3;
}
```

And some inline `code` examples.
