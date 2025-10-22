# Code Examples

This file demonstrates various programming languages and code highlighting.

## TypeScript

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

## C#

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

## CSS

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

## Bash

Here's some bash code:

```bash
#!/bin/bash

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo "File $1 exists"
    else
        echo "File $1 does not exist"
    fi
}

# Create a backup directory
mkdir -p backups

# Copy files with timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
cp important_file.txt "backups/important_file_${timestamp}.txt"

# Check if backup was successful
check_file "backups/important_file_${timestamp}.txt"
```

## YAML

Here's some YAML configuration:

```yaml
# Application configuration
app:
  name: "My Application"
  version: "1.0.0"
  debug: true

# Database settings
database:
  host: "localhost"
  port: 5432
  name: "myapp_db"
  ssl: true

# API endpoints
api:
  base_url: "https://api.example.com"
  timeout: 30
  retries: 3

# Feature flags
features:
  - "user_authentication"
  - "file_upload"
  - "notifications"

# Environment-specific overrides
environments:
  development:
    debug: true
    log_level: "debug"
  production:
    debug: false
    log_level: "info"
```

## Plain Code Block

Here's some code without language specification:

```
This is a plain code block without any language specified.
It will be rendered as plain text without syntax highlighting.

function example() {
    return "no highlighting";
}

// Comments and keywords won't be styled
var data = { key: "value" };
```

## Inline Code Examples

Here are some inline `code` examples: `const variable = "value"` and `function_name()`.
