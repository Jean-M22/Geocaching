string[] IncorrectNames = {"no", "incorrect", "wrong", "not here", "sorry", "try again", "not found", "nope", "failed", "missing", "ooops"};

void CreateDirectories(string baseDir, params string[][] paths)
{
    Directory.CreateDirectory(baseDir);

    if (paths.Length == 0)
    {
        File.WriteAllTextAsync(Path.Combine(baseDir, IncorrectNames[Random.Shared.Next(0, IncorrectNames.Length)]), "");
        return;
    }
    
    string[] newPaths = paths[0];
    string[][] passdownPaths = paths.ToList().GetRange(1, paths.Length - 1).ToArray();

    foreach (string path in newPaths)
    {
        CreateDirectories(Path.Combine(baseDir, path), passdownPaths);
    }

    if (paths.Length is 2 or 3 or 4)
    {
        Console.WriteLine("Finished " + baseDir);
    }
}

string[] NumberPaths = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
string[] DegMinPaths = new[]
{
    "N44_27_", "N44_28_", "N44_29_", "N44_30_", "N44_31_", "N44_32_",
    "E26_06_", "E26_07_", "E26_08_", "E26_09_", "E26_10_", "E26_11_",
}.Select(t => string.Join("/", t.ToCharArray().Reverse())).ToArray();

CreateDirectories(@"C:\Users\alexe\Desktop\GC9VF7F - Fun with Files", 
    NumberPaths,
    NumberPaths,
    NumberPaths,
    DegMinPaths
);