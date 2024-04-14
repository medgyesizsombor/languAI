﻿using System.Security.Cryptography;

namespace LanguAI.Backend.Utils;

public static class Hasher
{
    private const int ITERATIONS = 35000;
    private const int SALT_SIZE = 16; // 128 bit
    private const int KEY_SIZE = 64; // 512 bit

    public static string HashString(string password)
    {
        using var algorithm = new Rfc2898DeriveBytes(
          password,
          SALT_SIZE,
          ITERATIONS,
          HashAlgorithmName.SHA512);

        var key = Convert.ToBase64String(algorithm.GetBytes(KEY_SIZE));
        var salt = Convert.ToBase64String(algorithm.Salt);

        return $"{ITERATIONS}.{salt}.{key}";
    }

    public static bool Verify(string password, string hash)
    {
        var parts = hash.Split('.', 3);

        if (parts.Length != 3)
        {
            throw new FormatException("Unexpected hash format. " +
              "Should be formatted as `{iterations}.{salt}.{hash}`");
        }

        var iterations = Convert.ToInt32(parts[0]);
        var salt = Convert.FromBase64String(parts[1]);
        var key = Convert.FromBase64String(parts[2]);

        using var algorithm = new Rfc2898DeriveBytes(
          password,
          salt,
          iterations,
        HashAlgorithmName.SHA512);

        var keyToCheck = algorithm.GetBytes(KEY_SIZE);
        var verified = keyToCheck.SequenceEqual(key);

        return verified;
    }
}