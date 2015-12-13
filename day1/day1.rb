floor = 0
inputs = File.read('input.txt').rstrip.split("")
basement_reached = false;
moves_until_basement = false;

inputs.each_with_index do |input, index|
  if input == "("
    floor += 1
  elsif input == ")"
    floor -= 1
    if floor == -1 && !basement_reached
      moves_until_basement = index + 1
      basement_reached = true
    end
  end
end

puts "Part 1: #{floor}"
puts "Part 2: #{moves_until_basement}"
